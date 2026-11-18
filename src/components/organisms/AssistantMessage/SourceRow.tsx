import { Chip } from '@ds/atoms/Chip'
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
      className="flex flex-wrap items-center gap-group font-ui"
    >
      <span aria-hidden="true" className="text-caption text-text-muted">
        {wording.sourcesLabel}
      </span>
      {usedSources.length === 0 ? (
        <span className="text-caption text-text-muted">{wording.noSourcesUsed}</span>
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
