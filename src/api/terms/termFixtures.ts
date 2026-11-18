import type { TermEntry } from '@domain'

const samplePassageText = 'Layout sample: the term appears here in a passage.'

// The backend has no GET /terms yet. The counts and the notes are layout samples.
export const sampleTerms: TermEntry[] = [
  {
    id: 'ditthi',
    pali: 'diṭṭhi',
    gloss: 'view, opinion, theory',
    glossesText: 'English: view. Sinhala and Pali glosses: later.',
    variants: ['diṭṭhi', 'diṭṭhigata'],
    note: 'Translations vary: “view”, “opinion”, “speculative view” (sample).',
    occurrences: [
      { label: 'DN 1', count: 62 },
      { label: 'Others', count: 0 },
    ],
    passage: { citationId: 'pitaka_lk:dn-1:44:5', label: 'DN 1 · 44.5', text: samplePassageText },
  },
  {
    id: 'atta',
    pali: 'attā',
    gloss: 'self, soul',
    glossesText: 'English: self. Sinhala and Pali glosses: later.',
    variants: ['attā', 'attānaṃ'],
    note: 'Layout sample: how the word is translated depends on the passage.',
    occurrences: [
      { label: 'DN 1', count: 41 },
      { label: 'Others', count: 0 },
    ],
    passage: { citationId: 'pitaka_lk:dn-1:12:3', label: 'DN 1 · 12.3', text: samplePassageText },
  },
  {
    id: 'sassata',
    pali: 'sassata',
    gloss: 'eternal, lasting',
    glossesText: 'English: eternal. Sinhala and Pali glosses: later.',
    variants: ['sassata', 'sassatavāda'],
    note: 'Layout sample: often found in lists of views.',
    occurrences: [
      { label: 'DN 1', count: 28 },
      { label: 'Others', count: 0 },
    ],
    passage: { citationId: 'pitaka_lk:dn-1:5:2', label: 'DN 1 · 5.2', text: samplePassageText },
  },
  {
    id: 'phassa',
    pali: 'phassa',
    gloss: 'contact',
    glossesText: 'English: contact. Sinhala and Pali glosses: later.',
    variants: ['phassa', 'phasso'],
    note: 'Layout sample: a term from the chain of conditions.',
    occurrences: [
      { label: 'DN 1', count: 17 },
      { label: 'Others', count: 0 },
    ],
  },
]
