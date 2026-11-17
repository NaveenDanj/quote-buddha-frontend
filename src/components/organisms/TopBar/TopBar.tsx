import { Chip } from '@ds/atoms/Chip'
import { IconButton } from '@ds/atoms/IconButton'
import { Stamp } from '@ds/atoms/Stamp'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type TopBarProps = {
  title: string
  railId: string
  isRailOpen: boolean
  onToggleRail: () => void
  onOpenSearch: () => void
  isPanelOpen: boolean
  onTogglePanel: () => void
  onShare: () => void
}

export function TopBar({
  title,
  railId,
  isRailOpen,
  onToggleRail,
  onOpenSearch,
  isPanelOpen,
  onTogglePanel,
  onShare,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-(--z-topbar) flex h-(--layout-topbar) items-center justify-between gap-3 border-b border-border bg-page px-(--gutter)">
      <div className="flex min-w-0 items-center gap-3">
        <IconButton
          icon="menu"
          label={wording.menuLabel}
          aria-expanded={isRailOpen}
          aria-controls={railId}
          className="lg:hidden"
          onClick={onToggleRail}
        />
        <Text variant="ui" as="h1" className="truncate font-medium">
          {title}
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <Chip icon="search" aria-label={wording.searchLabel} onClick={onOpenSearch}>
          <span className="hidden sm:inline">
            <Stamp isKey>{wording.searchShortcutText}</Stamp>
          </span>
        </Chip>
        <IconButton
          icon="researchPanel"
          label={wording.researchPanelLabel}
          isPressed={isPanelOpen}
          onClick={onTogglePanel}
        />
        <IconButton icon="share" label={wording.shareChatLabel} onClick={onShare} />
      </div>
    </header>
  )
}
