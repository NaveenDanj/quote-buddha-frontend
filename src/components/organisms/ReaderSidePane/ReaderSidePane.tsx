import { IconButton } from '@ds/atoms/IconButton'
import { Tabs, type TabItem } from '@ds/atoms/Tabs'
import { wording } from '@wording'

type ReaderSidePaneProps = {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  onClose: () => void
}

// The pane beside the text. Only the content under the tabs scrolls. On a narrow window it is a drawer,
// and the close button shows.
export function ReaderSidePane({ tabs, activeTab, onTabChange, onClose }: ReaderSidePaneProps) {
  return (
    <div className="relative grid h-full min-h-0">
      <Tabs
        label={wording.notesPaneLabel}
        tabs={tabs}
        value={activeTab}
        onValueChange={onTabChange}
        className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]"
        listClassName="px-card pt-group"
        contentClassName="relative min-h-0 overflow-y-auto p-card"
      />
      <IconButton
        icon="close"
        size="small"
        label={wording.hidePaneLabel}
        onClick={onClose}
        className="absolute top-group right-card-tight lg:hidden"
      />
    </div>
  )
}
