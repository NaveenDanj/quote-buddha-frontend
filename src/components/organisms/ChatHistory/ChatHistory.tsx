import { useId } from 'react'
import type { MenuItem } from '@ds/atoms/Menu'
import { Text } from '@ds/atoms/Text'
import { chatOptionsText, wording } from '@wording'
import { ChatRow } from '@components/molecules/ChatRow'

export type ChatHistoryChat = {
  id: string
  title: string
}

export type ChatHistoryGroup = {
  id: string
  label: string
  chats: ChatHistoryChat[]
}

type ChatHistoryProps = {
  groups: ChatHistoryGroup[]
  selectedChatId?: string
  onOpenChat: (chatId: string) => void
  getMenuItems: (chatId: string) => MenuItem[]
}

type ChatGroupProps = Omit<ChatHistoryProps, 'groups'> & {
  group: ChatHistoryGroup
}

// The group name labels its list. It is not a heading, so the page keeps one clear heading order.
function ChatGroup({ group, selectedChatId, onOpenChat, getMenuItems }: ChatGroupProps) {
  const labelId = useId()

  return (
    <div className="grid gap-1">
      <Text variant="label" as="p" id={labelId} className="uppercase text-text-muted">
        {group.label}
      </Text>
      <ul aria-labelledby={labelId} className="m-0 list-none border-t border-border p-0">
        {group.chats.map((chat) => (
          <ChatRow
            key={chat.id}
            title={chat.title}
            isSelected={chat.id === selectedChatId}
            onOpen={() => onOpenChat(chat.id)}
            menuLabel={chatOptionsText(chat.title)}
            menuItems={getMenuItems(chat.id)}
          />
        ))}
      </ul>
    </div>
  )
}

// Past chats in groups, such as Pinned, Today and Earlier. An empty group is not shown.
export function ChatHistory({ groups, ...groupProps }: ChatHistoryProps) {
  const visibleGroups = groups.filter((group) => group.chats.length > 0)

  return (
    <div className="grid gap-4">
      <Text variant="ui" as="h2" className="sr-only">
        {wording.chatsLabel}
      </Text>
      {visibleGroups.map((group) => (
        <ChatGroup key={group.id} group={group} {...groupProps} />
      ))}
    </div>
  )
}
