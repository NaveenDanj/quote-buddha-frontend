import { QuoteOutcome, TextLanguage, type QuoteCheckResult, type QuotePassage } from '@domain'

const samplePassage: QuotePassage = {
  citationId: 'pitaka_lk:dn-1:44:5',
  citationLabel: 'DN 1 · 44.5',
  text: 'Placeholder passage text matching the pasted quote exactly.',
  language: TextLanguage.english,
  edition: 'Pali with Sinhala translation, pitaka.lk',
}

const foundVerbatimSample: QuoteCheckResult = {
  outcome: QuoteOutcome.foundVerbatim,
  passage: samplePassage,
}

const closeParaphraseSample: QuoteCheckResult = {
  outcome: QuoteOutcome.closeParaphrase,
  passage: { ...samplePassage, citationId: 'pitaka_lk:dn-1:12:3', citationLabel: 'DN 1 · 12.3' },
  yourQuoteParts: [
    { text: 'The ', isDifferent: false },
    { text: 'sample', isDifferent: true },
    { text: ' words as pasted, with some terms changed.', isDifferent: false },
  ],
  passageParts: [
    { text: 'The ', isDifferent: false },
    { text: 'placeholder', isDifferent: true },
    { text: ' words as they appear in the text.', isDifferent: false },
  ],
}

export const notFoundSample: QuoteCheckResult = { outcome: QuoteOutcome.notFound }

// The backend has no /verify-quote yet. These are the three outcomes from the prototype, shown one after another.
export const sampleQuoteChecks: QuoteCheckResult[] = [
  foundVerbatimSample,
  closeParaphraseSample,
  notFoundSample,
]
