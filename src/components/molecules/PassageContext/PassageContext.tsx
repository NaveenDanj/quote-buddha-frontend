import { Text } from '@ds/atoms/Text'

type PassageContextProps = {
  // What the pane is about, for example "On 1.1".
  label: string
}

// A dashed label that says which passage, or which selected words, the notes, explanation or question are about.
export function PassageContext({ label }: PassageContextProps) {
  return (
    <Text
      variant="small"
      className="max-w-full truncate rounded border border-dashed border-text-muted px-group py-related"
    >
      {label}
    </Text>
  )
}
