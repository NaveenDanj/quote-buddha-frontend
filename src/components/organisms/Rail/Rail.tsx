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
    <nav aria-labelledby={headingId} className="mt-2 grid gap-1">
      <Text variant="groupLabel" as="h2" id={headingId} className="text-text-muted">
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
                'flex w-full cursor-pointer items-center gap-3 border-y-0 border-r-0 border-l-2 bg-transparent py-(--nav-row-padding-y) pr-0 pl-3 text-left font-ui text-nav',
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

// Looks like a text field, but it opens the search. It is a button, so it says what it does.
function SearchButton({ onSearch }: { onSearch: () => void }) {
  return (
    <button
      type="button"
      onClick={onSearch}
      className="w-full cursor-pointer rounded border border-text-muted bg-page px-3 py-2 text-left font-ui text-nav text-text-muted hover:border-text"
    >
      {wording.searchChatsLabel}
    </button>
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
      className="relative grid h-full content-start gap-4 overflow-y-auto border-r border-border bg-page p-4"
    >
      <Text variant="heading3" as="p">
        {wording.productName}
      </Text>
      <Button leadingIcon="add" onClick={onNewChat}>
        {wording.newChatLabel}
      </Button>
      <SearchButton onSearch={onSearch} />
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
        <p className="m-0 font-ui text-stamp text-text-muted">{footerText}</p>
      </div>
    </aside>
  )
}
