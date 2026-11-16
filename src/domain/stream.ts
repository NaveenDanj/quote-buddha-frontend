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
