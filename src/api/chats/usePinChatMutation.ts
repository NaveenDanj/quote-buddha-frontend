import { setChatPinned } from './chatStore'

type PinChatRequest = {
  chatId: string
  isPinned: boolean
}

function pinChat(request: PinChatRequest) {
  setChatPinned(request.chatId, request.isPinned)
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function usePinChatMutation(): [typeof pinChat, { isLoading: boolean }] {
  return [pinChat, { isLoading: false }]
}
