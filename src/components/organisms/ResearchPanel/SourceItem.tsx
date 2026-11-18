import { Surface } from '@ds/atoms/Surface'
import { Text } from '@ds/atoms/Text'
import type { EvidenceState } from '@domain'
import { EvidenceTag } from '@components/molecules/EvidenceTag'
import { SourceDetails } from '@components/organisms/SourceDetails'
import type { AnswerSource } from '@domain'

type SourceItemProps = {
  source: AnswerSource
  number: number
  label: string
  state: EvidenceState
  isOpenAtStart: boolean
  onOpenInReader: (citationId: string) => void
  onCompare?: (citationId: string) => void
  onSave?: (citationId: string) => void
}

// One source in the list. Its name and tag are always shown, and its details open and close.
export function SourceItem({
  source,
  number,
  label,
  state,
  isOpenAtStart,
  onOpenInReader,
  onCompare,
  onSave,
}: SourceItemProps) {
  return (
    <details open={isOpenAtStart} className="border-t border-border pt-card-tight">
      <Text
        as="summary"
        variant="ui"
        weight="medium"
        className="flex cursor-pointer list-none items-center justify-between gap-block text-text [&::-webkit-details-marker]:hidden"
      >
        <span>{`[${number}] ${label}`}</span>
        <EvidenceTag state={state} />
      </Text>
      <Surface className="pt-card-tight">
        <SourceDetails
          source={source}
          onOpenInReader={onOpenInReader}
          onCompare={onCompare}
          onSave={onSave}
        />
      </Surface>
    </details>
  )
}
