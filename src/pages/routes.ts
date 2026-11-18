export const AppPath = {
  newChat: '/',
  chat: '/chat/:chatId',
  checkDocument: '/check-document',
  verifyQuote: '/verify-quote',
  reader: '/reader',
} as const

export function getChatPath(chatId: string): string {
  return `/chat/${chatId}`
}
