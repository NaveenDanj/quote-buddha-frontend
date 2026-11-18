import { DropZone } from '@ds/atoms/DropZone'
import { Surface } from '@ds/atoms/Surface'
import { documentFileChosenText, wording } from '@wording'
import { CheckTextBox } from '@components/molecules/CheckTextBox'

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
      <CheckTextBox
        label={wording.documentTextLabel}
        placeholder={wording.documentTextPlaceholder}
        value={pastedText}
        onValueChange={onPastedTextChange}
        rowCount={pastedTextRowCount}
        scopeText={wording.documentSearchScope}
        buttonLabel={wording.checkQuotesLabel}
        canCheck={canCheck}
        isChecking={isChecking}
        onCheck={onCheck}
      />
    </Surface>
  )
}
