import type { NewReaderNote } from '@domain'
import { addNote } from './noteStore'

function createNote(newNote: NewReaderNote) {
  const note = addNote(newNote)
  return { unwrap: () => Promise.resolve(note) }
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useCreateNoteMutation(): [typeof createNote, { isLoading: boolean }] {
  return [createNote, { isLoading: false }]
}
