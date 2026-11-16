import clsx from 'clsx'
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
    <div className="grid gap-2 font-ui">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-caption text-text">{title}</span>
        <span className="font-code text-stamp text-text-muted">{summary}</span>
      </div>
      <div aria-hidden="true" className="flex flex-wrap gap-1">
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
        <p className="m-0 text-stamp text-text-muted">{`${notYetIncludedCount} ${wording.notYetIncluded}`}</p>
      ) : null}
    </div>
  )
}
