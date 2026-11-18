import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { wording } from '@wording'
import { Rail } from '@components/organisms/Rail'
import { TopBar } from '@components/organisms/TopBar'
import { AppShell } from '@templates/AppShell'
import { doNothingYet } from '@pages/doNothingYet'
import { AppPath, getChatPath } from '@pages/routes'
import type { ToolId } from '@pages/workspaceTools'
import { getRailTools } from './getRailTools'
import { useRailChats } from './useRailChats'
import { useWorkspaceDialogs } from './useWorkspaceDialogs'
import { WorkspaceDialogs } from './WorkspaceDialogs'

type WorkspaceFrameProps = {
  title: string
  selectedChatId?: string
  // The research tool this page is, so the rail can show it as the current one.
  currentToolId?: ToolId
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
  currentToolId,
  panel,
  onTogglePanel = doNothingYet,
  onClosePanel = doNothingYet,
  children,
}: WorkspaceFrameProps) {
  const navigate = useNavigate()
  const [isRailOpen, setIsRailOpen] = useState(false)
  const [openedAtInMilliseconds] = useState(() => Date.now())

  const railChats = useRailChats(selectedChatId, openedAtInMilliseconds)
  const dialogs = useWorkspaceDialogs()
  function goTo(path: string) {
    setIsRailOpen(false)
    navigate(path)
  }

  const railTools = getRailTools(currentToolId, goTo)

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
          onSearch={() => dialogs.setIsSearchOpen(true)}
          onOpenChat={(chatId) => goTo(getChatPath(chatId))}
          getChatMenuItems={railChats.getChatMenuItems}
          onOpenSettings={() => dialogs.setIsSettingsOpen(true)}
        />
      }
      topBar={
        <TopBar
          title={title}
          railId={railId}
          isRailOpen={isRailOpen}
          onToggleRail={() => setIsRailOpen(!isRailOpen)}
          onOpenSearch={() => dialogs.setIsSearchOpen(true)}
          isPanelOpen={panel !== undefined}
          onTogglePanel={onTogglePanel}
          onShare={doNothingYet}
        />
      }
    >
      {children}
      <WorkspaceDialogs dialogs={dialogs} goTo={goTo} />
    </AppShell>
  )
}
