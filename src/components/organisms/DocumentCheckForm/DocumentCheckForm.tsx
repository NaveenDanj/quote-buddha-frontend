import { DropZone } from '@ds/atoms/DropZone'
import { Button } from '@ds/atoms/Button'
import { Surface, SurfaceLook } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { documentFileChosenText, wording } from '@wording'

type DocumentCheckFormProps = {
  chosenFileName?: string
  onFileChosen: (file: File) => void
  pastedText: string
  onPastedTextChange: (text: string) => void
  canCheck: boolean
  isChecking: boolean
  onCheck: () => void
}

const acceptedFileTypes = '.txt,.pdf,.docx'
const pastedTextRowCount = 4

export function DocumentCheckForm({
  chosenFileName,
  onFileChosen,
  pastedText,
  onPastedTextChange,
  canCheck,
  isChecking,
  onCheck,
}: DocumentCheckFormProps) {
  function chooseFile(files: File[]) {
    const [file] = files
    if (file) {
      onFileChosen(file)
    }
  }

  return (
    <Surface className="gap-area">
      <DropZone
        title={wording.documentDropTitle}
        hint={wording.documentDropHint}
        note={chosenFileName ? documentFileChosenText(chosenFileName) : undefined}
        accept={acceptedFileTypes}
        onFilesChosen={chooseFile}
      />
      <Surface look={SurfaceLook.outlined} className="relative focus-within:border-accent">
        <label>
          <VisuallyHidden>{wording.documentTextLabel}</VisuallyHidden>
          <textarea
            value={pastedText}
            rows={pastedTextRowCount}
            placeholder={wording.documentTextPlaceholder}
            onChange={(event) => onPastedTextChange(event.target.value)}
            className="min-h-(--composer-text-min-height) w-full resize-none border-0 bg-transparent px-card pt-card-tight pb-group font-reading text-input text-text placeholder:text-text-muted focus-visible:outline-0"
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-group pt-group pr-card-tight pb-card-tight pl-card">
          <Text variant="caption" isMuted>
            {wording.documentSearchScope}
          </Text>
          <Button size="small" disabled={!canCheck || isChecking} onClick={onCheck}>
            {isChecking ? wording.checkingQuotesLabel : wording.checkQuotesLabel}
          </Button>
        </div>
      </Surface>
    </Surface>
  )
}
