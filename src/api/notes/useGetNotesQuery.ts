import { useSyncExternalStore } from 'react'
import type { ReaderNote } from '@domain'
import { getNotes, subscribeToNotes } from './noteStore'

type GetNotesResult = {
  data: ReaderNote[] | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook, so swapping it in later changes only this file.
export function useGetNotesQuery(): GetNotesResult {
  const notes = useSyncExternalStore(subscribeToNotes, getNotes)
  return { data: notes, isLoading: false, isError: false }
}
