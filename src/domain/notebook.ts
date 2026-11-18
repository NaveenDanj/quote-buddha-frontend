export type NotebookPassage = {
  citationId: string
  // For example "DN 1 · 1.1".
  label: string
  // The words of the passage the note is about. Missing when the passage is not in the loaded texts.
  quote?: string
}

// One note in the Notebook: written in the Reader about a passage, or written here about nothing in particular.
export type NotebookEntry = {
  id: string
  createdAtInMilliseconds: number
  text: string
  isAiEnhanced: boolean
  originalText?: string
  passage?: NotebookPassage
}

export type SourceUse = {
  citationId: string
  label: string
  useCount: number
}

// The date as the exports write it, for example "2026-11-16".
export function formatNoteDate(timeInMilliseconds: number): string {
  return new Date(timeInMilliseconds).toISOString().slice(0, 10)
}

// The passages the notes are about, the most used first.
export function getSourcesUsed(entries: NotebookEntry[]): SourceUse[] {
  const uses = new Map<string, SourceUse>()
  for (const entry of entries) {
    if (!entry.passage) {
      continue
    }
    const existing = uses.get(entry.passage.citationId)
    const useCount = (existing?.useCount ?? 0) + 1
    uses.set(entry.passage.citationId, {
      citationId: entry.passage.citationId,
      label: entry.passage.label,
      useCount,
    })
  }
  return [...uses.values()].sort((first, second) => second.useCount - first.useCount)
}

export function sortNewestFirst(entries: NotebookEntry[]): NotebookEntry[] {
  return [...entries].sort(
    (first, second) => second.createdAtInMilliseconds - first.createdAtInMilliseconds,
  )
}
