import clsx from 'clsx'
import type { ReactNode } from 'react'

// The shape of the small square in front of the label. The shape carries the state, not the color.
// filled = solid, hatched = diagonal lines, dashed = dashed outline, plain = no square.
export type TagGlyph = 'filled' | 'hatched' | 'dashed' | 'plain'

type TagProps = {
  glyph?: TagGlyph
  children: ReactNode
}

const squareLook: Record<Exclude<TagGlyph, 'plain'>, string> = {
  filled: 'border-solid bg-current',
  hatched: 'border-solid bg-(image:--pattern-hatch)',
  dashed: 'border-dashed',
}

function TagGlyphSquare({ glyph }: { glyph: TagGlyph }) {
  if (glyph === 'plain') {
    return null
  }

  // forced-color-adjust-none keeps the three shapes different in Windows high contrast mode.
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-block size-(--glyph-size) shrink-0 forced-color-adjust-none border-(length:--glyph-outline) border-current',
        squareLook[glyph],
      )}
    />
  )
}

// The label always says the state in words. The square is a second cue, never the only one.
export function Tag({ glyph = 'plain', children }: TagProps) {
  return (
    <span className="inline-flex items-center gap-2 font-ui text-label font-medium whitespace-nowrap text-text">
      <TagGlyphSquare glyph={glyph} />
      {children}
    </span>
  )
}
