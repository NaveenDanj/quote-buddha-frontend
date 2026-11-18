export const ReadingView = {
  both: 'both',
  pali: 'pali',
  translation: 'translation',
} as const
export type ReadingView = (typeof ReadingView)[keyof typeof ReadingView]

export type Sutta = {
  id: string
  // For example "DN 1".
  workRef: string
  title: string
  // False for a text that is planned but not in the database yet.
  isIncluded: boolean
}

export type ReaderParagraph = {
  // The number inside its section, for example "1.2".
  id: string
  citationId: string
  paliText: string
  translationText: string
}

export type ReaderSection = {
  id: string
  paliTitle: string
  englishTitle: string
  paragraphs: ReaderParagraph[]
}

export function toReadingView(value: string): ReadingView {
  return Object.values(ReadingView).find((view) => view === value) ?? ReadingView.both
}

export function getSuttaLabel(sutta: Sutta): string {
  return `${sutta.workRef} · ${sutta.title}`
}

// Moving past the first or last section stays where it is.
export function clampSectionIndex(index: number, sectionCount: number): number {
  return Math.max(0, Math.min(sectionCount - 1, index))
}
