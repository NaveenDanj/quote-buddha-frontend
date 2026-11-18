// Notes written in the Notebook about nothing in particular. They live in memory until the backend has accounts.
export type FreeNote = {
  id: string
  createdAtInMilliseconds: number
  text: string
}

let freeNotes: FreeNote[] = []
const listeners = new Set<() => void>()

export function getFreeNotes(): FreeNote[] {
  return freeNotes
}

export function addFreeNote(text: string): FreeNote {
  const note: FreeNote = { id: crypto.randomUUID(), createdAtInMilliseconds: Date.now(), text }
  freeNotes = [...freeNotes, note]
  listeners.forEach((listener) => listener())
  return note
}

export function subscribeToFreeNotes(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function resetFreeNotes() {
  freeNotes = []
  listeners.forEach((listener) => listener())
}
