import { act, renderHook, waitFor } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'
import { AnswerDepth, StreamKind } from '@domain'
import { wording } from '@wording'
import { abstainedWeakEvidenceAnswer, answeredQuickAnswer, sampleStreamSteps } from '@api/fixtures'
import { createAskHandler } from '@api/mocks/handlers'
import { server } from '@api/mocks/server'
import { AskScope, type AskRequest } from './askRequest'
import { useAnswerStream } from './useAnswerStream'

const sampleRequest: AskRequest = {
  question: 'Layout sample: a question?',
  depth: AnswerDepth.quick,
  scope: AskScope.earlyTexts,
}

describe('useAnswerStream', () => {
  it('starts idle', () => {
    const { result } = renderHook(() => useAnswerStream())
    expect(result.current.state.kind).toBe(StreamKind.idle)
  })

  it('follows the steps and ends with the answer', async () => {
    server.use(createAskHandler({ answer: answeredQuickAnswer, stepDelayInMilliseconds: 0 }))
    const { result } = renderHook(() => useAnswerStream())

    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    const { state } = result.current
    expect(state.kind).toBe(StreamKind.answered)
    expect(state.kind === StreamKind.answered && state.steps).toEqual(sampleStreamSteps)
    expect(state.kind === StreamKind.answered && state.answer).toEqual(answeredQuickAnswer)
  })

  it('ends as abstained when the backend abstains', async () => {
    server.use(
      createAskHandler({ answer: abstainedWeakEvidenceAnswer, stepDelayInMilliseconds: 0 }),
    )
    const { result } = renderHook(() => useAnswerStream())

    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    expect(result.current.state.kind).toBe(StreamKind.abstained)
  })

  it('ends as failed with a calm message when the backend sends an error', async () => {
    const error = { code: 'sample_error', message: wording.askFailedText }
    server.use(createAskHandler({ error, stepDelayInMilliseconds: 0 }))
    const { result } = renderHook(() => useAnswerStream())

    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    const { state } = result.current
    expect(state.kind).toBe(StreamKind.failed)
    expect(state.kind === StreamKind.failed && state.error.message).toBe(wording.askFailedText)
  })

  it('ends as failed when the request fails', async () => {
    server.use(http.post('*/api/v1/ask', () => new HttpResponse(null, { status: 500 })))
    const { result } = renderHook(() => useAnswerStream())

    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    expect(result.current.state.kind).toBe(StreamKind.failed)
  })

  it('stops, and keeps the steps that had arrived', async () => {
    server.use(createAskHandler({ stepDelayInMilliseconds: 60 }))
    const { result } = renderHook(() => useAnswerStream())

    act(() => {
      void result.current.ask(sampleRequest)
    })
    await waitFor(() => {
      const { state } = result.current
      expect(state.kind === StreamKind.streaming && state.steps.length).toBeGreaterThan(0)
    })
    act(() => result.current.stop())

    await waitFor(() => expect(result.current.state.kind).toBe(StreamKind.stopped))
    const { state } = result.current
    expect(state.kind === StreamKind.stopped && state.steps.length).toBeGreaterThan(0)
  })

  it('ends as failed when the stream closes without an answer', async () => {
    server.use(createAskHandler({ endsWithoutAnswer: true, stepDelayInMilliseconds: 0 }))
    const { result } = renderHook(() => useAnswerStream())

    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    expect(result.current.state.kind).toBe(StreamKind.failed)
  })

  it('does not bring back "stopped" after a reset', async () => {
    server.use(createAskHandler({ stepDelayInMilliseconds: 40 }))
    const { result } = renderHook(() => useAnswerStream())

    act(() => {
      void result.current.ask(sampleRequest)
    })
    await waitFor(() => expect(result.current.state.kind).toBe(StreamKind.streaming))
    act(() => result.current.reset())
    await new Promise((resolve) => setTimeout(resolve, 150))

    expect(result.current.state.kind).toBe(StreamKind.idle)
  })

  it('goes back to idle on reset', async () => {
    server.use(createAskHandler({ stepDelayInMilliseconds: 0 }))
    const { result } = renderHook(() => useAnswerStream())
    await act(async () => {
      await result.current.ask(sampleRequest)
    })

    act(() => result.current.reset())

    expect(result.current.state.kind).toBe(StreamKind.idle)
  })
})
