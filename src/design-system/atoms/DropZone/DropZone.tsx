import clsx from 'clsx'
import { useState, type ChangeEvent, type DragEvent } from 'react'

type DropZoneProps = {
  title: string
  hint?: string
  accept?: string
  isMultiple?: boolean
  disabled?: boolean
  onFilesChosen: (files: File[]) => void
}

function pickFiles(fileList: FileList | null, isMultiple: boolean): File[] {
  const files = Array.from(fileList ?? [])
  return isMultiple ? files : files.slice(0, 1)
}

export function DropZone({
  title,
  hint,
  accept,
  isMultiple = false,
  disabled = false,
  onFilesChosen,
}: DropZoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const files = pickFiles(event.target.files, isMultiple)
    if (files.length > 0) {
      onFilesChosen(files)
    }
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
    const files = pickFiles(event.dataTransfer.files, isMultiple)
    if (files.length > 0) {
      onFilesChosen(files)
    }
  }

  return (
    <label
      onDragOver={onDragOver}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={onDrop}
      className={clsx(
        'grid cursor-pointer place-items-center gap-1 rounded border border-dashed px-4 py-6 text-center font-ui',
        'has-[:focus-visible]:outline-(length:--focus-ring-width) has-[:focus-visible]:outline-offset-(--focus-ring-offset) has-[:focus-visible]:outline-focus has-[:focus-visible]:outline-solid',
        isDraggingOver ? 'border-text text-text' : 'border-text-muted text-text-muted',
        disabled ? 'cursor-not-allowed opacity-35' : 'hover:border-text hover:text-text',
      )}
    >
      <span className="text-ui font-medium">{title}</span>
      {hint ? <span className="text-caption">{hint}</span> : null}
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
