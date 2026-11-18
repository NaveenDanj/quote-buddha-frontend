import { Chip } from '@ds/atoms/Chip'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type SourceChipProps = {
  number: number
  label: string
  onOpen: (number: number) => void
  // False for a text that is planned but not in the database yet.
  isIncluded?: boolean
  isPressed?: boolean
}

export function SourceChip({
  number,
  label,
  onOpen,
  isIncluded = true,
  isPressed,
}: SourceChipProps) {
  return (
    <Chip
      isPressed={isPressed}
      onClick={() => onOpen(number)}
      unavailableReason={isIncluded ? undefined : wording.notYetIncluded}
    >
      <Text variant="codeSmall" className="text-accent">
        {number}
      </Text>{' '}
      {label}
    </Chip>
  )
}
