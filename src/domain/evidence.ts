import { EvidenceLabel } from './answer'

export const EvidenceState = {
  directQuote: 'directQuote',
  notVerified: 'notVerified',
  notUsed: 'notUsed',
  removed: 'removed',
  notEstablished: 'notEstablished',
  notYetIncluded: 'notYetIncluded',
} as const
export type EvidenceState = (typeof EvidenceState)[keyof typeof EvidenceState]

// The design-system atom GlyphSquare has its own GlyphShape with the same three values,
// because design-system code cannot import from the domain. A test keeps the two in step.
export const EvidenceShape = {
  filled: 'filled',
  hatched: 'hatched',
  dashed: 'dashed',
} as const
export type EvidenceShape = (typeof EvidenceShape)[keyof typeof EvidenceShape]

export const evidenceStates: EvidenceState[] = Object.values(EvidenceState)

export function getEvidenceStateFromLabel(label: EvidenceLabel): EvidenceState {
  if (label === EvidenceLabel.direct) {
    return EvidenceState.directQuote
  }
  return EvidenceState.notVerified
}

export function getEvidenceShape(state: EvidenceState): EvidenceShape {
  switch (state) {
    case EvidenceState.directQuote:
      return EvidenceShape.filled
    case EvidenceState.notVerified:
      return EvidenceShape.hatched
    case EvidenceState.notUsed:
    case EvidenceState.removed:
    case EvidenceState.notEstablished:
    case EvidenceState.notYetIncluded:
      return EvidenceShape.dashed
  }
}
