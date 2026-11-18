import { CountBadge } from '@ds/atoms/CountBadge'
import { IconButton } from '@ds/atoms/IconButton'
import { wording } from '@wording'

type NotesToggleProps = {
  isOpen: boolean
  noteCount: number
  onToggle: () => void
}

// Shows or hides the notes pane, with the number of notes written on this text.
export function NotesToggle({ isOpen, noteCount, onToggle }: NotesToggleProps) {
  return (
    <span className="relative inline-grid">
      <IconButton
        icon="notes"
        label={wording.notesPaneLabel}
        isPressed={isOpen}
        aria-pressed={isOpen}
        onClick={onToggle}
      />
      {noteCount > 0 ? (
        <CountBadge
          count={noteCount}
          label={wording.notesTabLabel}
          className="pointer-events-none absolute top-0 right-0"
        />
      ) : null}
    </span>
  )
}
