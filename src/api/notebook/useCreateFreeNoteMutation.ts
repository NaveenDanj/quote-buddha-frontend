import { addFreeNote } from './freeNoteStore'

function createFreeNote(text: string) {
  const note = addFreeNote(text)
  return { unwrap: () => Promise.resolve(note) }
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useCreateFreeNoteMutation(): [typeof createFreeNote, { isLoading: boolean }] {
  return [createFreeNote, { isLoading: false }]
}
