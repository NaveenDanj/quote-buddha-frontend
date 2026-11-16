import clsx from 'clsx'
import { Chip } from '@ds/atoms/Chip'

type SuggestionChipsProps = {
  label: string
  suggestions: string[]
  onChoose: (suggestion: string) => void
  isCentered?: boolean
}

export function SuggestionChips({
  label,
  suggestions,
  onChoose,
  isCentered = false,
}: SuggestionChipsProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={clsx('flex flex-wrap gap-2', isCentered && 'justify-center')}
    >
      {suggestions.map((suggestion) => (
        <Chip key={suggestion} canWrap onClick={() => onChoose(suggestion)}>
          {suggestion}
        </Chip>
      ))}
    </div>
  )
}
