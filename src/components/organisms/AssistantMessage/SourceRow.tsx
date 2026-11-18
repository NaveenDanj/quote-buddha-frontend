import { Chip } from '@ds/atoms/Chip'
import { Text } from '@ds/atoms/Text'
import { getCitationLabel, getSourceNumber, type AnswerSource } from '@domain'
import { wording } from '@wording'
import { SourceChip } from '@components/molecules/SourceChip'

type SourceRowProps = {
  sources: AnswerSource[]
  onOpenSource: (citationId: string) => void
  onOpenGraph: () => void
}

export function SourceRow({ sources, onOpenSource, onOpenGraph }: SourceRowProps) {
  const usedSources = sources.filter((source) => source.used)

  return (
    <div
      role="group"
      aria-label={wording.sourcesLabel}
      className="flex flex-wrap items-center gap-group"
    >
      <Text variant="caption" isMuted aria-hidden="true">
        {wording.sourcesLabel}
      </Text>
      {usedSources.length === 0 ? (
        <Text variant="caption" isMuted>
          {wording.noSourcesUsed}
        </Text>
      ) : null}
      {usedSources.map((source) => (
        <SourceChip
          key={source.citationId}
          number={getSourceNumber(sources, source.citationId) ?? 0}
          label={getCitationLabel(source)}
          onOpen={() => onOpenSource(source.citationId)}
        />
      ))}
      <Chip icon="sourceGraph" onClick={onOpenGraph}>
        {wording.sourceGraphLabel}
      </Chip>
    </div>
  )
}
