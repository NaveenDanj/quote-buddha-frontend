import { EvidenceShape, EvidenceState, getEvidenceShape } from './evidence'

export const SayingOutcome = {
  verbatim: 'verbatim',
  closeParaphrase: 'closeParaphrase',
  notFound: 'notFound',
} as const
export type SayingOutcome = (typeof SayingOutcome)[keyof typeof SayingOutcome]

export type DocumentSaying = {
  id: string
  // The words as they appear in the document.
  text: string
  outcome: SayingOutcome
  // Only for a verbatim match or a close paraphrase.
  closestCitationId?: string
  closestCitationLabel?: string
}

export type DocumentCheckResult = {
  sayings: DocumentSaying[]
}

export type DocumentCheckRequest = {
  pastedText: string
  file?: File
}

export type OutcomeCounts = Record<SayingOutcome, number>

export function countOutcomes(sayings: DocumentSaying[]): OutcomeCounts {
  const counts: OutcomeCounts = { verbatim: 0, closeParaphrase: 0, notFound: 0 }
  for (const saying of sayings) {
    counts[saying.outcome] += 1
  }
  return counts
}

export function getEvidenceStateFromOutcome(outcome: SayingOutcome): EvidenceState {
  switch (outcome) {
    case SayingOutcome.verbatim:
      return EvidenceState.directQuote
    case SayingOutcome.closeParaphrase:
      return EvidenceState.notVerified
    case SayingOutcome.notFound:
      return EvidenceState.notEstablished
  }
}

export function getEvidenceShapeFromOutcome(outcome: SayingOutcome): EvidenceShape {
  return getEvidenceShape(getEvidenceStateFromOutcome(outcome))
}
