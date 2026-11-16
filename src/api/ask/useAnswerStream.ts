import { useEffect, useRef, useState } from 'react'
import { AnswerStatus, StreamKind, type StreamState, type StreamStep } from '@domain'
import { AskErrorCode, AskEventName, createAskError, type AskEvent } from './askEvents'
import { askQuestion } from './askQuestion'
import type { AskRequest } from './askRequest'

function getSteps(state: StreamState): StreamStep[] {
  return state.kind === StreamKind.idle ? [] : state.steps
}

function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}

function addEvent(state: StreamState, event: AskEvent): StreamState {
  const steps = getSteps(state)

  switch (event.kind) {
    case AskEventName.step:
      return { kind: StreamKind.streaming, steps: [...steps, event.step] }
    case AskEventName.answer:
      if (event.answer.status === AnswerStatus.abstained) {
        return { kind: StreamKind.abstained, steps, answer: event.answer }
      }
      return { kind: StreamKind.answered, steps, answer: event.answer }
    case AskEventName.error:
      return { kind: StreamKind.failed, steps, error: event.error }
  }
}

// A stream that closes before any answer or error arrived must not stay "streaming" forever.
function endUnfinishedStream(state: StreamState): StreamState {
  if (state.kind !== StreamKind.streaming) {
    return state
  }
  return {
    kind: StreamKind.failed,
    steps: state.steps,
    error: createAskError(AskErrorCode.noAnswer),
  }
}

// Asks a question and follows the answer as it arrives. Stop keeps the steps that already came.
export function useAnswerStream() {
  const [state, setState] = useState<StreamState>({ kind: StreamKind.idle })
  const controllerRef = useRef<AbortController | null>(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  async function ask(request: AskRequest) {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setState({ kind: StreamKind.streaming, steps: [] })

    try {
      await askQuestion(
        request,
        (event) => setState((current) => addEvent(current, event)),
        controller.signal,
      )
      if (controllerRef.current === controller) {
        setState(endUnfinishedStream)
      }
    } catch (error) {
      // An older request that was replaced or reset must not change what the screen shows now.
      if (controllerRef.current !== controller) {
        return
      }
      if (controller.signal.aborted && isAbortError(error)) {
        setState((current) => ({ kind: StreamKind.stopped, steps: getSteps(current) }))
        return
      }
      const failure = createAskError(AskErrorCode.requestFailed)
      setState((current) => ({ kind: StreamKind.failed, steps: getSteps(current), error: failure }))
    }
  }

  function stop() {
    controllerRef.current?.abort()
  }

  function reset() {
    controllerRef.current?.abort()
    controllerRef.current = null
    setState({ kind: StreamKind.idle })
  }

  return { state, ask, stop, reset }
}
