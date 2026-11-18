import { Surface } from '@ds/atoms/Surface'
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
    <details open={isOpenAtStart} className="border-t border-border pt-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-ui text-ui font-medium text-text [&::-webkit-details-marker]:hidden">
        <span>{`[${number}] ${label}`}</span>
        <EvidenceTag state={state} />
      </summary>
      <Surface className="pt-3">
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
