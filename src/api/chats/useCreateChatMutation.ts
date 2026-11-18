import type { Chat } from '@domain'
import { addChat } from './chatStore'

type CreateChatRequest = {
  title: string
}

type CreateChatCall = {
  unwrap: () => Promise<Chat>
}

type CreateChatState = {
  isLoading: boolean
}

function createChat(request: CreateChatRequest): CreateChatCall {
  const chat = addChat(request.title)
  return { unwrap: () => Promise.resolve(chat) }
}

export function useCreateChatMutation(): [typeof createChat, CreateChatState] {
  return [createChat, { isLoading: false }]
}
