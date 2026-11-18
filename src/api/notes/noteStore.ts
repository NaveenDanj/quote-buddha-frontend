import type { NewReaderNote, ReaderNote } from '@domain'

// Notes live in memory until the backend has accounts. Reloading the page starts again from the samples.
const sampleDateInMilliseconds = Date.UTC(2026, 10, 16)

const sampleNotes: ReaderNote[] = [
  {
    id: 'sample-1',
    createdAtInMilliseconds: sampleDateInMilliseconds,
    suttaId: 'dn-1',
    sectionIndex: 0,
    paragraphId: '1.1',
    citationId: 'pitaka_lk:dn-1:1:1',
    text: 'Layout sample: the traditional opening. Compare how other suttas open.',
    isAiEnhanced: false,
  },
  {
    id: 'sample-2',
    createdAtInMilliseconds: sampleDateInMilliseconds,
    suttaId: 'dn-1',
    sectionIndex: 0,
    paragraphId: '1.2',
    citationId: 'pitaka_lk:dn-1:1:2',
    text: 'Layout sample: this paragraph sets the scene for the discussion that follows.',
    isAiEnhanced: true,
    originalText: 'sets the scene?',
  },
]

let notes: ReaderNote[] = sampleNotes
const listeners = new Set<() => void>()

function tellListeners() {
  listeners.forEach((listener) => listener())
}

export function getNotes(): ReaderNote[] {
  return notes
}

export function addNote(newNote: NewReaderNote): ReaderNote {
  const note: ReaderNote = {
    ...newNote,
    id: crypto.randomUUID(),
    createdAtInMilliseconds: Date.now(),
  }
  notes = [...notes, note]
  tellListeners()
  return note
}

export function subscribeToNotes(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function resetNotes() {
  notes = sampleNotes
  tellListeners()
}
