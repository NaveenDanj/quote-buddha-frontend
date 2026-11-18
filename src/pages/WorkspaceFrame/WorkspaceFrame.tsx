import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { wording } from '@wording'
import { Rail, type RailTool } from '@components/organisms/Rail'
import { TopBar } from '@components/organisms/TopBar'
import { AppShell } from '@templates/AppShell'
import { doNothingYet } from '@pages/doNothingYet'
import { AppPath, getChatPath } from '@pages/routes'
import { openTool, railToolDefinitions } from '@pages/workspaceTools'
import { useRailChats } from './useRailChats'

type WorkspaceFrameProps = {
  title: string
  selectedChatId?: string
  // Give a panel to dock it on the right. Leave it out when the panel is closed.
  panel?: ReactNode
  onTogglePanel?: () => void
  onClosePanel?: () => void
  children: ReactNode
}

const railId = 'workspace-rail'

export function WorkspaceFrame({
  title,
  selectedChatId,
  panel,
  onTogglePanel = doNothingYet,
  onClosePanel = doNothingYet,
  children,
}: WorkspaceFrameProps) {
  const navigate = useNavigate()
  const [isRailOpen, setIsRailOpen] = useState(false)
  const [openedAtInMilliseconds] = useState(() => Date.now())

  const railChats = useRailChats(selectedChatId, openedAtInMilliseconds)
  const railTools: RailTool[] = railToolDefinitions.map((tool) => ({
    ...tool,
    isCurrent: false,
    onOpen: () => openTool(tool.id),
  }))

  function goTo(path: string) {
    setIsRailOpen(false)
    navigate(path)
  }

  return (
    <AppShell
      isRailOpen={isRailOpen}
      onCloseRail={() => setIsRailOpen(false)}
      panel={panel}
      onClosePanel={onClosePanel}
      rail={
        <Rail
          id={railId}
          groups={railChats.groups}
          selectedChatId={selectedChatId}
          tools={railTools}
          footerText={wording.corpusFooterText}
          onNewChat={() => goTo(AppPath.newChat)}
          onSearch={doNothingYet}
          onOpenChat={(chatId) => goTo(getChatPath(chatId))}
          getChatMenuItems={railChats.getChatMenuItems}
          onOpenSettings={doNothingYet}
        />
      }
      topBar={
        <TopBar
          title={title}
          railId={railId}
          isRailOpen={isRailOpen}
          onToggleRail={() => setIsRailOpen(!isRailOpen)}
          onOpenSearch={doNothingYet}
          isPanelOpen={panel !== undefined}
          onTogglePanel={onTogglePanel}
          onShare={doNothingYet}
        />
      }
    >
      {children}
    </AppShell>
  )
}
