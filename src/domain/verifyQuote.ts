import { EvidenceShape, EvidenceState, getEvidenceShape } from './evidence'
import type { TextLanguage } from './language'

export const QuoteOutcome = {
  foundVerbatim: 'foundVerbatim',
  closeParaphrase: 'closeParaphrase',
  notFound: 'notFound',
} as const
export type QuoteOutcome = (typeof QuoteOutcome)[keyof typeof QuoteOutcome]

export type QuotePassage = {
  citationId: string
  citationLabel: string
  text: string
  language: TextLanguage
  // For example "Pali with Sinhala translation, pitaka.lk".
  edition: string
}

// A piece of text. The pieces that differ from the other text are marked.
export type TextPart = {
  text: string
  isDifferent: boolean
}

export type QuoteCheckResult =
  | { outcome: typeof QuoteOutcome.foundVerbatim; passage: QuotePassage }
  | {
      outcome: typeof QuoteOutcome.closeParaphrase
      passage: QuotePassage
      yourQuoteParts: TextPart[]
      passageParts: TextPart[]
    }
  | { outcome: typeof QuoteOutcome.notFound }

export type QuoteCheckRequest = {
  quote: string
}

export function getEvidenceStateFromQuoteOutcome(outcome: QuoteOutcome): EvidenceState {
  switch (outcome) {
    case QuoteOutcome.foundVerbatim:
      return EvidenceState.directQuote
    case QuoteOutcome.closeParaphrase:
      return EvidenceState.notVerified
    case QuoteOutcome.notFound:
      return EvidenceState.notEstablished
  }
}

export function getEvidenceShapeFromQuoteOutcome(outcome: QuoteOutcome): EvidenceShape {
  return getEvidenceShape(getEvidenceStateFromQuoteOutcome(outcome))
}

export function toQuoteOutcome(value: string): QuoteOutcome {
  if (value === QuoteOutcome.closeParaphrase) {
    return QuoteOutcome.closeParaphrase
  }
  if (value === QuoteOutcome.notFound) {
    return QuoteOutcome.notFound
  }
  return QuoteOutcome.foundVerbatim
}
