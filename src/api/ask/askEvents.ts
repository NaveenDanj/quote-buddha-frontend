import type { Answer, AskError, StreamStep } from '@domain'
import { wording } from '@wording'
import type { ServerSentEvent } from './readServerSentEvents'

export const AskEventName = {
  step: 'step',
  answer: 'answer',
  error: 'error',
} as const
export type AskEventName = (typeof AskEventName)[keyof typeof AskEventName]

export const AskErrorCode = {
  badEvent: 'bad_event',
  noStream: 'no_stream',
  noAnswer: 'no_answer',
  requestFailed: 'request_failed',
} as const

export type AskEvent =
  | { kind: typeof AskEventName.step; step: StreamStep }
  | { kind: typeof AskEventName.answer; answer: Answer }
  | { kind: typeof AskEventName.error; error: AskError }

export function createAskError(code: string): AskError {
  return { code, message: wording.askFailedText }
}

// Events with a name we do not know are ignored, so the backend can add new ones safely.
export function parseAskEvent(serverEvent: ServerSentEvent): AskEvent | null {
  const isKnown = Object.values<string>(AskEventName).includes(serverEvent.event)
  if (!isKnown) {
    return null
  }

  try {
    const payload: unknown = JSON.parse(serverEvent.data)
    switch (serverEvent.event) {
      case AskEventName.step:
        return { kind: AskEventName.step, step: payload as StreamStep }
      case AskEventName.answer:
        return { kind: AskEventName.answer, answer: payload as Answer }
      default:
        return { kind: AskEventName.error, error: payload as AskError }
    }
  } catch {
    return { kind: AskEventName.error, error: createAskError(AskErrorCode.badEvent) }
  }
}
