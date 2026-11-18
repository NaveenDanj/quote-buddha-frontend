import { useSyncExternalStore } from 'react'
import type { Chat } from '@domain'
import { getChats, subscribeToChats } from './chatStore'

type GetChatsResult = {
  data: Chat[] | undefined
  isLoading: boolean
  isError: boolean
}

export function useGetChatsQuery(): GetChatsResult {
  const chats = useSyncExternalStore(subscribeToChats, getChats)
  return { data: chats, isLoading: false, isError: false }
}
