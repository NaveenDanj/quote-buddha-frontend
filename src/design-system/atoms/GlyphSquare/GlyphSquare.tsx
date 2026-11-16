import clsx from 'clsx'

export const GlyphShape = {
  filled: 'filled',
  hatched: 'hatched',
  dashed: 'dashed',
} as const
export type GlyphShape = (typeof GlyphShape)[keyof typeof GlyphShape]

const shapeClass: Record<GlyphShape, string> = {
  filled: 'border-solid bg-current',
  hatched: 'border-solid bg-(image:--pattern-hatch)',
  dashed: 'border-dashed',
}

export function GlyphSquare({ shape }: { shape: GlyphShape }) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-block size-(--glyph-size) shrink-0 forced-color-adjust-none border-(length:--glyph-outline) border-current',
        shapeClass[shape],
      )}
    />
  )
}
