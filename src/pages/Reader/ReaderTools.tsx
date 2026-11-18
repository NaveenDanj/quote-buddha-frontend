import type { Sutta } from '@domain'
import { ReaderToolbar } from '@components/organisms/ReaderToolbar'
import type { useReader } from './useReader'

type ReaderToolsProps = {
  reader: ReturnType<typeof useReader>
  currentSutta: Sutta
  noteCount: number
}

export function ReaderTools({ reader, currentSutta, noteCount }: ReaderToolsProps) {
  return (
    <ReaderToolbar
      suttas={reader.suttas}
      currentSutta={currentSutta}
      onChooseSutta={reader.chooseSutta}
      sections={reader.sections}
      currentSectionIndex={reader.sectionIndex}
      onChangeSection={reader.changeSection}
      view={reader.view}
      onChangeView={reader.setView}
      onChangeTextSize={reader.changeTextSize}
      isOutlineOpen={reader.isOutlineOpen}
      onToggleOutline={reader.toggleOutline}
      isSideOpen={reader.isSideOpen}
      onToggleSide={reader.toggleSide}
      noteCount={noteCount}
    />
  )
}
