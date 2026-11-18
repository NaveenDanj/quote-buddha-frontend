import clsx from 'clsx'
import { useState, type ChangeEvent, type DragEvent } from 'react'

type DropZoneProps = {
  title: string
  hint?: string
  // A third line for what just happened, for example the name of the chosen file.
  note?: string
  accept?: string
  isMultiple?: boolean
  disabled?: boolean
  onFilesChosen: (files: File[]) => void
}

const focusRingClass =
  'has-[:focus-visible]:outline-(length:--focus-ring-width) has-[:focus-visible]:outline-offset-(--focus-ring-offset) has-[:focus-visible]:outline-focus has-[:focus-visible]:outline-solid'

function pickFiles(fileList: FileList | null, isMultiple: boolean): File[] {
  const files = Array.from(fileList ?? [])
  return isMultiple ? files : files.slice(0, 1)
}

type DropZoneWordsProps = Pick<DropZoneProps, 'title' | 'hint' | 'note'>

function DropZoneWords({ title, hint, note }: DropZoneWordsProps) {
  return (
    <>
      <span className="pointer-events-none text-ui font-medium">{title}</span>
      {hint ? <span className="pointer-events-none text-caption">{hint}</span> : null}
      {note ? <span className="pointer-events-none text-caption">{note}</span> : null}
    </>
  )
}

export function DropZone({
  title,
  hint,
  note,
  accept,
  isMultiple = false,
  disabled = false,
  onFilesChosen,
}: DropZoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  function chooseFiles(fileList: FileList | null) {
    const files = pickFiles(fileList, isMultiple)
    if (files.length > 0) {
      onFilesChosen(files)
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    chooseFiles(event.target.files)
    event.target.value = ''
  }

  function onDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    if (!disabled) {
      setIsDraggingOver(true)
    }
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsDraggingOver(false)
    if (disabled) {
      return
    }
    chooseFiles(event.dataTransfer.files)
  }

  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={onDrop}
      className={clsx(
        'relative grid place-items-center gap-1 rounded border border-dashed px-4 py-6 text-center font-ui',
        focusRingClass,
        isDraggingOver ? 'border-text text-text' : 'border-text-muted text-text-muted',
        disabled
          ? 'cursor-not-allowed opacity-(--opacity-disabled)'
          : 'cursor-pointer hover:border-text hover:text-text',
      )}
    >
      <DropZoneWords title={title} hint={hint} note={note} />
      <input
        type="file"
        className="sr-only"
        accept={accept}
        multiple={isMultiple}
        disabled={disabled}
        onChange={onInputChange}
      />
    </label>
  )
}
