import { describe, expect, it } from 'vitest'
import { EvidenceLabel } from './answer'
import { buildAnswer, buildClaim, buildSource } from '@api/fixtures'
import { EvidenceState } from './evidence'
import { deriveEvidenceMatrix, getMatrixCellState } from './evidenceMatrix'

const quoteSource = buildSource({ citationId: 'sample:1' })
const otherCitedSource = buildSource({ citationId: 'sample:2' })
const uncitedSource = buildSource({ citationId: 'sample:3' })

describe('getMatrixCellState', () => {
  it('is a direct quote only where the quoted words were found', () => {
    const claim = buildClaim({
      citationIds: ['sample:1'],
      quoteCitationId: 'sample:1',
      evidenceLabel: EvidenceLabel.direct,
    })
    expect(getMatrixCellState(claim, quoteSource)).toBe(EvidenceState.directQuote)
  })

  it('is not verified for another passage the claim cites, because the quote was not found there', () => {
    const claim = buildClaim({
      citationIds: ['sample:1', 'sample:2'],
      quoteCitationId: 'sample:1',
      evidenceLabel: EvidenceLabel.direct,
    })
    expect(getMatrixCellState(claim, otherCitedSource)).toBe(EvidenceState.notVerified)
  })

  it('is never a direct quote when the claim is unverified', () => {
    const claim = buildClaim({
      citationIds: ['sample:1'],
      quoteCitationId: 'sample:1',
      evidenceLabel: EvidenceLabel.unverified,
    })
    expect(getMatrixCellState(claim, quoteSource)).toBe(EvidenceState.notVerified)
  })

  it('is not used for a passage the claim does not cite', () => {
    const claim = buildClaim({ citationIds: ['sample:1'], quoteCitationId: 'sample:1' })
    expect(getMatrixCellState(claim, uncitedSource)).toBe(EvidenceState.notUsed)
  })
})

describe('deriveEvidenceMatrix', () => {
  it('has one column for each retrieved passage and one row for each claim', () => {
    const answer = buildAnswer({
      claims: [buildClaim({ citationIds: ['sample:1'], quoteCitationId: 'sample:1' })],
      sources: [quoteSource, otherCitedSource, uncitedSource],
    })

    const matrix = deriveEvidenceMatrix(answer)

    expect(matrix.columns).toEqual(answer.sources)
    expect(matrix.rows).toHaveLength(1)
    expect(matrix.rows[0]?.states).toEqual([
      EvidenceState.directQuote,
      EvidenceState.notUsed,
      EvidenceState.notUsed,
    ])
  })

  it('counts the claims that were removed, without listing them as answers', () => {
    const matrix = deriveEvidenceMatrix(buildAnswer({ droppedClaimCount: 2 }))
    expect(matrix.removedCount).toBe(2)
    expect(matrix.rows).toHaveLength(0)
  })
})
