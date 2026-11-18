import { Button } from '@ds/atoms/Button'
import { IconButton, IconButtonLook } from '@ds/atoms/IconButton'
import { Textarea } from '@ds/atoms/Textarea'
import { wording } from '@wording'
import { SuggestionBlock } from '@components/molecules/SuggestionBlock'

const noteRowCount = 3

export type NoteEditorProps = {
  draft: string
  onDraftChange: (draft: string) => void
  canSave: boolean
  onSave: () => void
  canEnhance: boolean
  isEnhancing: boolean
  onEnhance: () => void
  // What the system suggests, shown until the person uses it or discards it.
  suggestion?: string
  onUseSuggestion: () => void
  onDiscardSuggestion: () => void
}

// The box for a new note. "Enhance with AI" only suggests: the note is never changed until the person says so.
export function NoteEditor({
  draft,
  onDraftChange,
  canSave,
  onSave,
  canEnhance,
  isEnhancing,
  onEnhance,
  suggestion,
  onUseSuggestion,
  onDiscardSuggestion,
}: NoteEditorProps) {
  return (
    <div className="grid gap-block">
      <Textarea
        label={wording.noteBoxLabel}
        isLabelHidden
        rows={noteRowCount}
        placeholder={wording.notePlaceholder}
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
      />
      <div className="flex items-center justify-between gap-group">
        <Button
          variant="secondary"
          size="small"
          leadingIcon="ai"
          disabled={!canEnhance || isEnhancing}
          onClick={onEnhance}
        >
          {isEnhancing ? wording.enhancingLabel : wording.enhanceWithAiLabel}
        </Button>
        <IconButton
          icon="done"
          look={IconButtonLook.solid}
          label={wording.saveNoteLabel}
          disabled={!canSave}
          onClick={onSave}
        />
      </div>
      {suggestion ? (
        <SuggestionBlock onUse={onUseSuggestion} onDiscard={onDiscardSuggestion}>
          {suggestion}
        </SuggestionBlock>
      ) : null}
    </div>
  )
}
