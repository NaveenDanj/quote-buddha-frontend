import { SayingOutcome, type DocumentCheckResult } from '@domain'

// The backend has no /check-document yet, so this is the layout sample from the prototype.
export const sampleDocumentCheckResult: DocumentCheckResult = {
  sayings: [
    {
      id: 'one',
      text: '“Sample saying one”',
      outcome: SayingOutcome.verbatim,
      closestCitationId: 'pitaka_lk:dn-1:44:5',
      closestCitationLabel: 'DN 1 · 44.5',
    },
    {
      id: 'two',
      text: '“Sample saying two”',
      outcome: SayingOutcome.closeParaphrase,
      closestCitationId: 'pitaka_lk:dn-1:12:3',
      closestCitationLabel: 'DN 1 · 12.3',
    },
    { id: 'three', text: '“Sample saying three”', outcome: SayingOutcome.notFound },
    { id: 'four', text: '“Sample saying four”', outcome: SayingOutcome.notFound },
  ],
}
