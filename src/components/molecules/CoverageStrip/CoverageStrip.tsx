import clsx from 'clsx'

type CoverageStripProps = {
  title: string
  // The same facts in words, for example "1 of 34 suttas". It also names the squares for screen readers.
  summary: string
  includedCount: number
  totalCount: number
}

function getSquareClass(isIncluded: boolean): string {
  if (isIncluded) {
    return 'border-accent bg-accent'
  }
  return 'border-dashed border-text-muted'
}

// A filled square is a text in the database, a dashed outline is a text that is not in it yet.
export function CoverageStrip({ title, summary, includedCount, totalCount }: CoverageStripProps) {
  const positions = Array.from({ length: totalCount }, (_, position) => position)

  return (
    <div className="grid gap-2 font-ui">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-caption text-text">{title}</span>
        <span className="font-code text-stamp text-text-muted">{summary}</span>
      </div>
      <div role="img" aria-label={summary} className="flex flex-wrap gap-1">
        {positions.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={clsx(
              'size-(--coverage-square-size) border',
              getSquareClass(position < includedCount),
            )}
          />
        ))}
      </div>
    </div>
  )
}
