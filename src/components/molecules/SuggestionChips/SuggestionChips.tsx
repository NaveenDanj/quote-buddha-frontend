import { Chip } from '@ds/atoms/Chip'

type SuggestionChipsProps = {
  label: string
  suggestions: string[]
  onChoose: (suggestion: string) => void
}

export function SuggestionChips({ label, suggestions, onChoose }: SuggestionChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <Chip key={suggestion} canWrap onClick={() => onChoose(suggestion)}>
          {suggestion}
        </Chip>
      ))}
    </div>
  )
}
