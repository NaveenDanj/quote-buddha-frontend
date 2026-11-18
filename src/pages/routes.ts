export const AppPath = {
  newChat: '/',
  chat: '/chat/:chatId',
} as const

export function getChatPath(chatId: string): string {
  return `/chat/${chatId}`
}
