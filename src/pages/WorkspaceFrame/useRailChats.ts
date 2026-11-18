import type { MenuItem } from '@ds/atoms/Menu'
import { useNavigate } from 'react-router'
import { ChatGroupId, groupChatsByDay, type ChatGroup } from '@domain'
import { wording } from '@wording'
import { useDeleteChatMutation, useGetChatsQuery, usePinChatMutation } from '@api/chats'
import { AppPath } from '@pages/routes'

const chatGroupLabels: Record<ChatGroupId, string> = {
  [ChatGroupId.pinned]: wording.pinnedLabel,
  [ChatGroupId.today]: wording.todayLabel,
  [ChatGroupId.earlier]: wording.earlierLabel,
}

// Pinned chats come first. The rest are grouped by day.
function getChatGroups(allChats: ChatGroup['chats'], nowInMilliseconds: number): ChatGroup[] {
  const pinnedChats = allChats.filter((chat) => chat.isPinned)
  const otherChats = allChats.filter((chat) => !chat.isPinned)
  const pinnedGroup: ChatGroup = { id: ChatGroupId.pinned, chats: pinnedChats }
  return [pinnedGroup, ...groupChatsByDay(otherChats, nowInMilliseconds)]
}

// The chats for the rail, and what the options menu of each chat can do.
export function useRailChats(selectedChatId: string | undefined, nowInMilliseconds: number) {
  const navigate = useNavigate()
  const { data: chats } = useGetChatsQuery()
  const [pinChat] = usePinChatMutation()
  const [deleteChat] = useDeleteChatMutation()
  const allChats = chats ?? []

  const groups = getChatGroups(allChats, nowInMilliseconds).map((group) => ({
    id: group.id,
    label: chatGroupLabels[group.id],
    chats: group.chats.map((chat) => ({ id: chat.id, title: chat.title })),
  }))

  function getChatMenuItems(chatId: string): MenuItem[] {
    const chat = allChats.find((candidate) => candidate.id === chatId)
    if (!chat) {
      return []
    }
    return [
      {
        label: chat.isPinned ? wording.unpinChatLabel : wording.pinChatLabel,
        onSelect: () => pinChat({ chatId, isPinned: !chat.isPinned }),
      },
      {
        label: wording.deleteChatLabel,
        icon: 'delete',
        onSelect: () => {
          deleteChat(chatId)
          if (chatId === selectedChatId) {
            navigate(AppPath.newChat)
          }
        },
      },
    ]
  }

  return { groups, getChatMenuItems }
}
