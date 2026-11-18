import { Meter } from '@ds/atoms/Meter'
import { Stamp } from '@ds/atoms/Stamp'
import { Text } from '@ds/atoms/Text'
import { getLargestOccurrenceCount, type TermOccurrence } from '@domain'
import { occurrenceCountLabel } from '@wording'

type OccurrenceBarsProps = {
  occurrences: TermOccurrence[]
}

// A bar for each text, as long as its count compared with the largest. The number is written next to the bar.
export function OccurrenceBars({ occurrences }: OccurrenceBarsProps) {
  const largestCount = getLargestOccurrenceCount(occurrences)

  return (
    <div className="grid gap-group">
      {occurrences.map((occurrence) => (
        <div
          key={occurrence.label}
          className="grid grid-cols-[var(--occurrence-label-width)_minmax(0,1fr)_var(--occurrence-count-width)] items-center gap-block"
        >
          <Text variant="caption" isMuted={occurrence.count === 0}>
            {occurrence.label}
          </Text>
          <Meter
            value={occurrence.count}
            max={largestCount}
            label={occurrenceCountLabel(occurrence.label)}
          />
          <Stamp>{String(occurrence.count)}</Stamp>
        </div>
      ))}
    </div>
  )
}
