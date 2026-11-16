import { RemovableChip } from '@ds/atoms/RemovableChip'

type FileChipProps = {
  fileName: string
  removeLabel: string
  onRemove: () => void
}

export function FileChip({ fileName, removeLabel, onRemove }: FileChipProps) {
  return (
    <RemovableChip icon="attach" label={fileName} removeLabel={removeLabel} onRemove={onRemove} />
  )
}
