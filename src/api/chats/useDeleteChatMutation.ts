import { removeChat } from './chatStore'

function deleteChat(chatId: string) {
  removeChat(chatId)
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useDeleteChatMutation(): [typeof deleteChat, { isLoading: boolean }] {
  return [deleteChat, { isLoading: false }]
}
