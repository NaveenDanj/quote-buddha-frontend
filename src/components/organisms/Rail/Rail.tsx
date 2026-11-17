import clsx from 'clsx'
import { useId } from 'react'
import { Button } from '@ds/atoms/Button'
import { Icon, type IconName } from '@ds/atoms/Icon'
import type { MenuItem } from '@ds/atoms/Menu'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ChatHistory, type ChatHistoryGroup } from '@components/organisms/ChatHistory'

export type RailTool = {
  id: string
  label: string
  icon: IconName
  isCurrent: boolean
  onOpen: () => void
}

type RailProps = {
  id?: string
  groups: ChatHistoryGroup[]
  selectedChatId?: string
  tools: RailTool[]
  // For example the corpus version and which texts are included.
  footerText: string
  onNewChat: () => void
  onSearch: () => void
  onOpenChat: (chatId: string) => void
  getChatMenuItems: (chatId: string) => MenuItem[]
  onOpenSettings: () => void
}

function ToolLinks({ tools }: { tools: RailTool[] }) {
  const headingId = useId()

  return (
    <nav aria-labelledby={headingId} className="grid gap-2">
      <Text variant="label" as="h2" id={headingId} className="uppercase text-text-muted">
        {wording.toolsGroupLabel}
      </Text>
      <ul className="m-0 grid list-none gap-px p-0">
        {tools.map((tool) => (
          <li key={tool.id}>
            <button
              type="button"
              onClick={tool.onOpen}
              aria-current={tool.isCurrent ? 'page' : undefined}
              className={clsx(
                'flex w-full cursor-pointer items-center gap-3 border-y-0 border-r-0 border-l-2 bg-transparent px-3 py-2 text-left font-ui text-ui',
                tool.isCurrent
                  ? 'border-l-text font-medium text-text forced-colors:border-l-4'
                  : 'border-l-transparent text-text-muted hover:text-text',
              )}
            >
              <Icon name={tool.icon} size="small" />
              {tool.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// The left column: new chat, search, past chats, research tools, settings and the corpus line.
export function Rail({
  id,
  groups,
  selectedChatId,
  tools,
  footerText,
  onNewChat,
  onSearch,
  onOpenChat,
  getChatMenuItems,
  onOpenSettings,
}: RailProps) {
  return (
    <aside
      id={id}
      aria-label={wording.workspaceLabel}
      className="grid gap-4 p-4 h-full content-start overflow-y-auto border-r border-border bg-page"
    >
      <Text variant="heading3" as="p">
        {wording.productName}
      </Text>
      <Button leadingIcon="add" onClick={onNewChat}>
        {wording.newChatLabel}
      </Button>
      <Button variant="secondary" leadingIcon="search" onClick={onSearch}>
        {wording.searchChatsLabel}
      </Button>
      <ChatHistory
        groups={groups}
        selectedChatId={selectedChatId}
        onOpenChat={onOpenChat}
        getMenuItems={getChatMenuItems}
      />
      <ToolLinks tools={tools} />
      <div className="grid gap-1">
        <div>
          <Button variant="text" size="small" leadingIcon="settings" onClick={onOpenSettings}>
            {wording.settingsLabel}
          </Button>
        </div>
        <Text variant="caption" as="p" className="text-text-muted">
          {footerText}
        </Text>
      </div>
    </aside>
  )
}
