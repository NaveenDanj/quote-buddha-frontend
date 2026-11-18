import { IconButton } from '@ds/atoms/IconButton'
import { SegmentedControl } from '@ds/atoms/SegmentedControl'
import { ReadingView, toReadingView, type ReaderSection, type Sutta } from '@domain'
import { wording } from '@wording'
import { NotesToggle } from './NotesToggle'
import { SectionSelect } from './SectionSelect'
import { SuttaPicker } from './SuttaPicker'

type ReaderToolbarProps = {
  suttas: Sutta[]
  currentSutta: Sutta
  onChooseSutta: (suttaId: string) => void
  sections: ReaderSection[]
  currentSectionIndex: number
  onChangeSection: (index: number) => void
  view: ReadingView
  onChangeView: (view: ReadingView) => void
  onChangeTextSize: () => void
  isOutlineOpen: boolean
  onToggleOutline: () => void
  isSideOpen: boolean
  onToggleSide: () => void
  noteCount: number
}

const viewOptions = [
  { value: ReadingView.both, label: wording.viewBothLabel },
  { value: ReadingView.pali, label: wording.viewPaliLabel },
  { value: ReadingView.translation, label: wording.viewEnglishLabel },
]

const groupClass = 'flex flex-wrap items-center gap-x-block gap-y-group'

export function ReaderToolbar({
  suttas,
  currentSutta,
  onChooseSutta,
  sections,
  currentSectionIndex,
  onChangeSection,
  view,
  onChangeView,
  onChangeTextSize,
  isOutlineOpen,
  onToggleOutline,
  isSideOpen,
  onToggleSide,
  noteCount,
}: ReaderToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-section gap-y-group border-b border-border px-(--gutter) py-group">
      <div className={groupClass}>
        <SuttaPicker suttas={suttas} currentSutta={currentSutta} onChooseSutta={onChooseSutta} />
        <SectionSelect
          sections={sections}
          currentIndex={currentSectionIndex}
          onChangeSection={onChangeSection}
        />
      </div>
      <div className={groupClass}>
        <SegmentedControl
          label={wording.readingViewLabel}
          options={viewOptions}
          value={view}
          onValueChange={(value) => onChangeView(toReadingView(value))}
        />
        <IconButton icon="terms" label={wording.textSizeLabel} onClick={onChangeTextSize} />
        <IconButton
          icon="sectionsList"
          label={wording.sectionsListLabel}
          isPressed={isOutlineOpen}
          aria-pressed={isOutlineOpen}
          onClick={onToggleOutline}
        />
        <NotesToggle isOpen={isSideOpen} noteCount={noteCount} onToggle={onToggleSide} />
      </div>
    </div>
  )
}
