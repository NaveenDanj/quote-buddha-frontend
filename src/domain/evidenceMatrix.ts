import { EvidenceLabel, type Answer, type AnswerSource, type VerifiedClaim } from './answer'
import { EvidenceState } from './evidence'

export type EvidenceMatrixRow = {
  claim: VerifiedClaim
  // One state for each column, in the same order as the columns.
  states: EvidenceState[]
}

export type EvidenceMatrixTable = {
  columns: AnswerSource[]
  rows: EvidenceMatrixRow[]
  removedCount: number
}

export function getMatrixCellState(claim: VerifiedClaim, source: AnswerSource): EvidenceState {
  const isQuoteSource = claim.quoteCitationId === source.citationId
  const isCited = isQuoteSource || claim.citationIds.includes(source.citationId)

  if (!isCited) {
    return EvidenceState.notUsed
  }
  if (isQuoteSource && claim.evidenceLabel === EvidenceLabel.direct) {
    return EvidenceState.directQuote
  }
  return EvidenceState.notVerified
}

// A source that no claim used is "not used". Otherwise it is a direct quote if any claim quotes it word for word.
export function getSourceEvidenceState(answer: Answer, source: AnswerSource): EvidenceState {
  if (!source.used) {
    return EvidenceState.notUsed
  }
  const isQuotedWordForWord = answer.claims.some(
    (claim) => getMatrixCellState(claim, source) === EvidenceState.directQuote,
  )
  return isQuotedWordForWord ? EvidenceState.directQuote : EvidenceState.notVerified
}

export function deriveEvidenceMatrix(answer: Answer): EvidenceMatrixTable {
  const rows = answer.claims.map((claim) => ({
    claim,
    states: answer.sources.map((source) => getMatrixCellState(claim, source)),
  }))

  return {
    columns: answer.sources,
    rows,
    removedCount: answer.droppedClaimCount,
  }
}
