import type { Answer, AnswerDepth } from './answer'
import { StreamKind, type StreamState } from './stream'

// One question and the answer to it.
export type Turn = {
  id: string
  question: string
  depth: AnswerDepth
  state: StreamState
}

export function isStreamFinished(state: StreamState): boolean {
  switch (state.kind) {
    case StreamKind.idle:
    case StreamKind.streaming:
      return false
    default:
      return true
  }
}

// Both an answered and an abstained stream carry an answer.
export function getAnswerFromStream(state: StreamState): Answer | undefined {
  switch (state.kind) {
    case StreamKind.answered:
    case StreamKind.abstained:
      return state.answer
    default:
      return undefined
  }
}
