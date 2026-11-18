import { Button } from '@ds/atoms/Button'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { Textarea } from '@ds/atoms/Textarea'
import { wording } from '@wording'

type NotebookNoteEditorProps = {
  value: string
  onValueChange: (value: string) => void
  onSave: () => void
}

const noteRowCount = 3

export function NotebookNoteEditor({ value, onValueChange, onSave }: NotebookNoteEditorProps) {
  return (
    <Surface look={SurfaceLook.dashed} padding={SurfaceSpace.medium} gap={SurfaceSpace.medium}>
      <Text variant="label" isMuted>
        {wording.newNoteLabel}
      </Text>
      <Textarea
        label={wording.newNoteLabel}
        isLabelHidden
        rows={noteRowCount}
        placeholder={wording.writeNotePlaceholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      />
      <div>
        <Button size="small" disabled={value.trim().length === 0} onClick={onSave}>
          {wording.saveNoteLabel}
        </Button>
      </div>
    </Surface>
  )
}
