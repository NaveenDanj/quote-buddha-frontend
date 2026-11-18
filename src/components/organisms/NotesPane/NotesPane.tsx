import { EmptyState } from '@ds/atoms/EmptyState'
import { SegmentedControl } from '@ds/atoms/SegmentedControl'
import { NoteScope, toNoteScope, type ReaderNote } from '@domain'
import { wording } from '@wording'
import { NoteCard } from '@components/molecules/NoteCard'
import { PassageContext } from '@components/molecules/PassageContext'
import { NoteEditor, type NoteEditorProps } from './NoteEditor'

type NotesPaneProps = NoteEditorProps & {
  // What a new note will be attached to, for example "On 1.1".
  contextLabel: string
  scope: NoteScope
  onScopeChange: (scope: NoteScope) => void
  workRef: string
  notes: ReaderNote[]
  onOpenPassage: (citationId: string) => void
}

const scopeOptions = [
  { value: NoteScope.section, label: wording.noteScopeSectionLabel },
  { value: NoteScope.all, label: wording.noteScopeAllLabel },
]

function NoteItem({
  note,
  workRef,
  onOpenPassage,
}: {
  note: ReaderNote
  workRef: string
  onOpenPassage: (citationId: string) => void
}) {
  const passageLabel = `${workRef} · ${note.paragraphId}`
  const sharedProps = {
    passageLabel,
    citationId: note.citationId,
    onOpenPassage,
    text: note.text,
    actionsLabel: wording.notesTabLabel,
  }

  if (note.isAiEnhanced) {
    return <NoteCard {...sharedProps} isAiEnhanced originalText={note.originalText ?? ''} />
  }
  return <NoteCard {...sharedProps} />
}

// The notes tab of the Reader: write a note on the selected paragraph, then read the notes written so far.
export function NotesPane({
  contextLabel,
  scope,
  onScopeChange,
  workRef,
  notes,
  onOpenPassage,
  ...editorProps
}: NotesPaneProps) {
  return (
    <div className="grid content-start gap-section">
      <div className="flex flex-wrap items-center justify-between gap-group">
        <PassageContext label={contextLabel} />
        <SegmentedControl
          label={wording.noteScopeLabel}
          options={scopeOptions}
          value={scope}
          onValueChange={(value) => onScopeChange(toNoteScope(value))}
        />
      </div>
      <NoteEditor {...editorProps} />
      {notes.length === 0 ? (
        <EmptyState icon="notes" title={wording.noNotesInScopeText} />
      ) : (
        <ul aria-label={wording.yourNotesLabel} className="grid list-none gap-section">
          {notes.map((note) => (
            <li key={note.id}>
              <NoteItem note={note} workRef={workRef} onOpenPassage={onOpenPassage} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
