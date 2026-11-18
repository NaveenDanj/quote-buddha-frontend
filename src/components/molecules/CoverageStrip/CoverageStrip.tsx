import clsx from 'clsx'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'

type CoverageStripProps = {
  title: string
  // The same facts in words, for example "1 of 34 suttas".
  summary: string
  includedCount: number
  totalCount: number
}

function getSquareClass(isIncluded: boolean): string {
  if (isIncluded) {
    return 'border-accent bg-accent forced-color-adjust-none forced-colors:bg-[CanvasText]'
  }
  return 'border-dashed border-text-muted'
}

// A filled square is a text in the database, a dashed outline is a text that is not in it yet.
export function CoverageStrip({ title, summary, includedCount, totalCount }: CoverageStripProps) {
  const safeIncludedCount = Math.min(includedCount, totalCount)
  const notYetIncludedCount = totalCount - safeIncludedCount
  const squarePositions = Array.from({ length: totalCount }, (_, position) => position)

  return (
    <div className="grid gap-group">
      <div className="flex items-baseline justify-between gap-block">
        <Text variant="caption" className="text-text">
          {title}
        </Text>
        <Text variant="codeSmall" isMuted>
          {summary}
        </Text>
      </div>
      <div aria-hidden="true" className="flex flex-wrap gap-related">
        {squarePositions.map((position) => (
          <span
            key={position}
            className={clsx(
              'size-(--coverage-square-size) border',
              getSquareClass(position < safeIncludedCount),
            )}
          />
        ))}
      </div>
      {notYetIncludedCount > 0 ? (
        <Text variant="small" as="p" isMuted>
          {`${notYetIncludedCount} ${wording.notYetIncluded}`}
        </Text>
      ) : null}
    </div>
  )
}
