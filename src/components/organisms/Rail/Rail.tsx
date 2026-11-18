import { useId } from 'react'
import { Button } from '@ds/atoms/Button'
import { FieldButton } from '@ds/atoms/FieldButton'
import { Icon, type IconName } from '@ds/atoms/Icon'
import type { MenuItem } from '@ds/atoms/Menu'
import { SelectableRow } from '@ds/atoms/SelectableRow'
import { Surface, SurfaceRows, SurfaceSpace } from '@ds/atoms/Surface'
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
    <nav aria-labelledby={headingId} className="grid gap-related">
      <Text variant="groupLabel" as="h2" id={headingId} isMuted>
        {wording.toolsGroupLabel}
      </Text>
      <ul className="grid list-none gap-px">
        {tools.map((tool) => (
          <li key={tool.id}>
            <SelectableRow isCurrent={tool.isCurrent} onClick={tool.onOpen}>
              <Icon name={tool.icon} size="small" />
              {tool.label}
            </SelectableRow>
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
    <Surface
      as="aside"
      id={id}
      aria-label={wording.workspaceLabel}
      rows={SurfaceRows.headerThenFillThenFooter}
      className="h-full min-h-0 border-r border-border bg-page"
    >
      <Surface padding={SurfaceSpace.medium} gap={SurfaceSpace.large}>
        <Text variant="heading3" as="p">
          {wording.productName}
        </Text>
        <Button leadingIcon="add" onClick={onNewChat}>
          {wording.newChatLabel}
        </Button>
        <FieldButton onClick={onSearch}>{wording.searchChatsLabel}</FieldButton>
      </Surface>

      <Surface isScrollArea className="px-card pb-card">
        <ChatHistory
          groups={groups}
          selectedChatId={selectedChatId}
          onOpenChat={onOpenChat}
          getMenuItems={getChatMenuItems}
        />
      </Surface>

      <Surface
        padding={SurfaceSpace.medium}
        gap={SurfaceSpace.small}
        className="border-t border-border"
      >
        <ToolLinks tools={tools} />
        <div className="grid gap-related">
          <div>
            <Button variant="text" size="small" leadingIcon="settings" onClick={onOpenSettings}>
              {wording.settingsLabel}
            </Button>
          </div>
          <Text variant="small" as="p" isMuted>
            {footerText}
          </Text>
        </div>
      </Surface>
    </Surface>
  )
}
