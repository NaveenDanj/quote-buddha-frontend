import { useId } from 'react'
import { EmptyState } from '@ds/atoms/EmptyState'
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

function ChatGroup({ group, selectedChatId, onOpenChat, getMenuItems }: ChatGroupProps) {
  const labelId = useId()

  return (
    <div className="mt-group grid gap-related">
      <Text variant="groupLabel" as="p" id={labelId} isMuted>
        {group.label}
      </Text>
      <ul aria-labelledby={labelId} className="grid list-none gap-px">
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

export function ChatHistory({ groups, ...groupProps }: ChatHistoryProps) {
  const visibleGroups = groups.filter((group) => group.chats.length > 0)
  const hasNoChats = visibleGroups.length === 0
  const alignClass = hasNoChats ? 'content-center' : 'content-start'

  return (
    <div className={`grid h-full gap-related ${alignClass}`}>
      <Text variant="ui" as="h2" className="sr-only">
        {wording.chatsLabel}
      </Text>
      {hasNoChats ? (
        <EmptyState icon="ask" title={wording.noChatsTitle} description={wording.noChatsText} />
      ) : null}
      {visibleGroups.map((group) => (
        <ChatGroup key={group.id} group={group} {...groupProps} />
      ))}
    </div>
  )
}
