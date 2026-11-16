import type { Answer } from './answer'

export const StreamStepKind = {
  planning: 'planning',
  searching: 'searching',
  retrieved: 'retrieved',
  drafting: 'drafting',
  verifying: 'verifying',
  compiling: 'compiling',
} as const
export type StreamStepKind = (typeof StreamStepKind)[keyof typeof StreamStepKind]

export type StreamStep = {
  kind: StreamStepKind
  text: string
  count?: number
}

export type AskError = {
  code: string
  message: string
}

export const StreamKind = {
  idle: 'idle',
  streaming: 'streaming',
  answered: 'answered',
  abstained: 'abstained',
  stopped: 'stopped',
  failed: 'failed',
} as const

// What the screen shows for one answer, from the first step to the end.
export type StreamState =
  | { kind: typeof StreamKind.idle }
  | { kind: typeof StreamKind.streaming; steps: StreamStep[] }
  | { kind: typeof StreamKind.answered; steps: StreamStep[]; answer: Answer }
  | { kind: typeof StreamKind.abstained; steps: StreamStep[]; answer: Answer }
  | { kind: typeof StreamKind.stopped; steps: StreamStep[] }
  | { kind: typeof StreamKind.failed; steps: StreamStep[]; error: AskError }
