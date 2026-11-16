import { http, HttpResponse, type RequestHandler } from 'msw'
import type { Answer, AskError, StreamStep } from '@domain'
import { AskEventName } from '@api/ask/askEvents'
import { answeredQuickAnswer, sampleStreamSteps } from '@api/fixtures'

const defaultStepDelayInMilliseconds = 400

type AskHandlerOptions = {
  answer?: Answer
  // When given, the stream ends with this error instead of an answer.
  error?: AskError
  steps?: StreamStep[]
  // For testing: the stream closes after the steps, with no answer and no error.
  endsWithoutAnswer?: boolean
  stepDelayInMilliseconds?: number
}

function formatServerSentEvent(eventName: string, payload: unknown): string {
  return `event: ${eventName}\ndata: ${JSON.stringify(payload)}\n\n`
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// A mock of POST /api/v1/ask that sends the same events the real backend will: steps, then an answer or an error.
export function createAskHandler(options: AskHandlerOptions = {}): RequestHandler {
  const {
    answer = answeredQuickAnswer,
    error,
    steps = sampleStreamSteps,
    endsWithoutAnswer = false,
    stepDelayInMilliseconds = defaultStepDelayInMilliseconds,
  } = options

  return http.post('*/api/v1/ask', () => {
    const encoder = new TextEncoder()
    let isCancelled = false

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        for (const step of steps) {
          await wait(stepDelayInMilliseconds)
          if (isCancelled) {
            return
          }
          controller.enqueue(encoder.encode(formatServerSentEvent(AskEventName.step, step)))
        }
        if (endsWithoutAnswer) {
          controller.close()
          return
        }
        const finalEvent = error
          ? formatServerSentEvent(AskEventName.error, error)
          : formatServerSentEvent(AskEventName.answer, answer)
        controller.enqueue(encoder.encode(finalEvent))
        controller.close()
      },
      cancel() {
        isCancelled = true
      },
    })

    return new HttpResponse(body, { headers: { 'Content-Type': 'text/event-stream' } })
  })
}

export const handlers: RequestHandler[] = [createAskHandler()]
