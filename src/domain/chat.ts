export type Chat = {
  id: string
  title: string
  createdAtInMilliseconds: number
  isPinned: boolean
}

export const ChatGroupId = {
  pinned: 'pinned',
  today: 'today',
  earlier: 'earlier',
} as const
export type ChatGroupId = (typeof ChatGroupId)[keyof typeof ChatGroupId]

export type ChatGroup = {
  id: ChatGroupId
  chats: Chat[]
}

const longestChatTitleInCharacters = 60
const ellipsis = '…'

export function getChatTitleFromQuestion(question: string): string {
  const trimmedQuestion = question.trim()
  if (trimmedQuestion.length <= longestChatTitleInCharacters) {
    return trimmedQuestion
  }
  return trimmedQuestion.slice(0, longestChatTitleInCharacters).trimEnd() + ellipsis
}

export function isCreatedToday(chat: Chat, nowInMilliseconds: number): boolean {
  const startOfToday = new Date(nowInMilliseconds)
  startOfToday.setHours(0, 0, 0, 0)
  return chat.createdAtInMilliseconds >= startOfToday.getTime()
}

function sortNewestFirst(chats: Chat[]): Chat[] {
  return [...chats].sort(
    (first, second) => second.createdAtInMilliseconds - first.createdAtInMilliseconds,
  )
}

export function groupChatsByDay(chats: Chat[], nowInMilliseconds: number): ChatGroup[] {
  const todayChats = chats.filter((chat) => isCreatedToday(chat, nowInMilliseconds))
  const earlierChats = chats.filter((chat) => !isCreatedToday(chat, nowInMilliseconds))

  const groups: ChatGroup[] = [
    { id: ChatGroupId.today, chats: sortNewestFirst(todayChats) },
    { id: ChatGroupId.earlier, chats: sortNewestFirst(earlierChats) },
  ]
  return groups.filter((group) => group.chats.length > 0)
}
