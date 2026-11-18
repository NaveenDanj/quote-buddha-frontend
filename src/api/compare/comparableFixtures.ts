import type { ComparablePassage } from '@domain'

// The backend has no GET /passages/{citationId} yet. The wording is a layout sample, but the terms are real Pali words.
export const sampleComparablePassages: ComparablePassage[] = [
  {
    citationId: 'pitaka_lk:dn-1:44:5',
    label: 'DN 1 · 44.5',
    paliText: 'Layout sample: Pali for passage A, with diṭṭhi, attā and sassata in the wording.',
    translationText: 'Layout sample translation for passage A.',
    terms: ['diṭṭhi', 'attā', 'sassata'],
  },
  {
    citationId: 'pitaka_lk:dn-1:12:3',
    label: 'DN 1 · 12.3',
    paliText:
      'Layout sample: Pali for passage B, with diṭṭhi, attā and ucchedavāda in the wording.',
    translationText: 'Layout sample translation for passage B.',
    terms: ['diṭṭhi', 'attā', 'ucchedavāda'],
  },
  {
    citationId: 'pitaka_lk:dn-1:5:2',
    label: 'DN 1 · 5.2',
    paliText: 'Layout sample: Pali for passage C, with phassa and diṭṭhi in the wording.',
    translationText: 'Layout sample translation for passage C.',
    terms: ['phassa', 'diṭṭhi'],
  },
]
