import { RemovableChip } from '@ds/atoms/RemovableChip'

type ContextChipProps = {
  // What the next question is about, for example the section being read.
  label: string
  removeLabel: string
  onRemove: () => void
}

export function ContextChip({ label, removeLabel, onRemove }: ContextChipProps) {
  return <RemovableChip label={label} removeLabel={removeLabel} onRemove={onRemove} isDashed />
}
