export const NoteScope = {
  section: 'section',
  all: 'all',
} as const
export type NoteScope = (typeof NoteScope)[keyof typeof NoteScope]

export type ReaderNote = {
  id: string
  createdAtInMilliseconds: number
  suttaId: string
  sectionIndex: number
  paragraphId: string
  citationId: string
  text: string
  isAiEnhanced: boolean
  // What the person wrote before the system rewrote it. Only for an AI-enhanced note.
  originalText?: string
}

export type NewReaderNote = Omit<ReaderNote, 'id' | 'createdAtInMilliseconds'>

export function toNoteScope(value: string): NoteScope {
  return value === NoteScope.all ? NoteScope.all : NoteScope.section
}

export function filterNotesByScope(
  notes: ReaderNote[],
  scope: NoteScope,
  suttaId: string,
  sectionIndex: number,
): ReaderNote[] {
  const notesOfSutta = notes.filter((note) => note.suttaId === suttaId)
  if (scope === NoteScope.all) {
    return notesOfSutta
  }
  return notesOfSutta.filter((note) => note.sectionIndex === sectionIndex)
}

export function countNotesByParagraph(notes: ReaderNote[]): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const note of notes) {
    counts[note.paragraphId] = (counts[note.paragraphId] ?? 0) + 1
  }
  return counts
}
