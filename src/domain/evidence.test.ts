import { describe, expect, it } from 'vitest'
import { EvidenceLabel } from './answer'
import {
  EvidenceShape,
  EvidenceState,
  evidenceStates,
  getEvidenceShape,
  getEvidenceStateFromLabel,
} from './evidence'

const allShapes: EvidenceShape[] = Object.values(EvidenceShape)

describe('getEvidenceStateFromLabel', () => {
  it('turns the backend label into a state', () => {
    expect(getEvidenceStateFromLabel(EvidenceLabel.direct)).toBe(EvidenceState.directQuote)
    expect(getEvidenceStateFromLabel(EvidenceLabel.unverified)).toBe(EvidenceState.notVerified)
  })
})

describe('getEvidenceShape', () => {
  it('gives every state a shape', () => {
    for (const state of evidenceStates) {
      expect(allShapes).toContain(getEvidenceShape(state))
    }
  })

  it('fills the square only for a direct quote', () => {
    for (const state of evidenceStates) {
      const isFilled = getEvidenceShape(state) === EvidenceShape.filled
      expect(isFilled).toBe(state === EvidenceState.directQuote)
    }
  })

  it('hatches the square for a quote that is not verified', () => {
    expect(getEvidenceShape(EvidenceState.notVerified)).toBe(EvidenceShape.hatched)
  })

  it('draws a dashed outline for everything that has no support', () => {
    const statesWithoutSupport = [
      EvidenceState.notUsed,
      EvidenceState.removed,
      EvidenceState.notEstablished,
      EvidenceState.notYetIncluded,
    ]
    for (const state of statesWithoutSupport) {
      expect(getEvidenceShape(state)).toBe(EvidenceShape.dashed)
    }
  })
})
