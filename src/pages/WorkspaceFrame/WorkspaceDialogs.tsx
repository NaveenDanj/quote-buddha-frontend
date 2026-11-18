import { useReadingSize } from '@ds/tokens/readingSize'
import { useTheme } from '@ds/tokens/theme'
import { wording } from '@wording'
import { useGetChatsQuery } from '@api/chats'
import { SearchDialog, type SearchItem } from '@components/organisms/SearchDialog'
import { SettingsDialog } from '@components/organisms/SettingsDialog'
import { AppPath, getChatPath } from '@pages/routes'
import type { useWorkspaceDialogs } from './useWorkspaceDialogs'

type WorkspaceDialogsProps = {
  dialogs: ReturnType<typeof useWorkspaceDialogs>
  goTo: (path: string) => void
}

const newChatItemId = 'new-chat'

export function WorkspaceDialogs({ dialogs, goTo }: WorkspaceDialogsProps) {
  const { data: chats } = useGetChatsQuery()
  const { theme, setTheme } = useTheme()
  const { readingSize, setReadingSize } = useReadingSize()

  function choose(path: string) {
    dialogs.setIsSearchOpen(false)
    goTo(path)
  }

  const newestChatsFirst = [...(chats ?? [])].reverse()
  const items: SearchItem[] = [
    {
      id: newChatItemId,
      label: wording.newChatLabel,
      kindLabel: wording.searchActionKind,
      onChoose: () => choose(AppPath.newChat),
    },
    ...newestChatsFirst.map((chat) => ({
      id: chat.id,
      label: chat.title,
      kindLabel: wording.searchChatKind,
      onChoose: () => choose(getChatPath(chat.id)),
    })),
  ]

  return (
    <>
      <SearchDialog
        isOpen={dialogs.isSearchOpen}
        onOpenChange={dialogs.setIsSearchOpen}
        items={items}
      />
      <SettingsDialog
        isOpen={dialogs.isSettingsOpen}
        onOpenChange={dialogs.setIsSettingsOpen}
        theme={theme}
        onThemeChange={setTheme}
        readingSize={readingSize}
        onReadingSizeChange={setReadingSize}
      />
    </>
  )
}
