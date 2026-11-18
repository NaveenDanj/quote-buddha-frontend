import { useSyncExternalStore } from 'react'
import type { Turn } from '@domain'
import { getTurns, subscribeToTurns } from './turnStore'

type GetTurnsResult = {
  data: Turn[] | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook, so swapping it in later changes only this file.
export function useGetTurnsQuery(chatId: string): GetTurnsResult {
  const turns = useSyncExternalStore(subscribeToTurns, () => getTurns(chatId))
  return { data: turns, isLoading: false, isError: false }
}
