export type TermSummary = {
  id: string
  pali: string
}

export type TermOccurrence = {
  // A text, for example "DN 1", or "Others".
  label: string
  count: number
}

export type TermPassage = {
  citationId: string
  label: string
  text: string
}

export type TermEntry = TermSummary & {
  // A few words, for example "view, opinion, theory".
  gloss: string
  glossesText: string
  variants: string[]
  note: string
  occurrences: TermOccurrence[]
  passage?: TermPassage
}

// Letters without their marks and in lower case, so "dit" finds "diṭṭhi" and "ATTA" finds "attā".
export function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function filterTerms(terms: TermSummary[], query: string): TermSummary[] {
  const normalizedQuery = normalizeForSearch(query.trim())
  if (normalizedQuery === '') {
    return terms
  }
  return terms.filter((term) => normalizeForSearch(term.pali).includes(normalizedQuery))
}

export function getLargestOccurrenceCount(occurrences: TermOccurrence[]): number {
  return Math.max(0, ...occurrences.map((occurrence) => occurrence.count))
}
