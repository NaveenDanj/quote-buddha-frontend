import clsx from 'clsx'
import type { ReactNode } from 'react'
import { GlyphShape, GlyphSquare } from '@ds/atoms/GlyphSquare'

export const TagGlyph = { ...GlyphShape, plain: 'plain' } as const
export type TagGlyph = (typeof TagGlyph)[keyof typeof TagGlyph]

type TagProps = {
  glyph?: TagGlyph
  // For a long sentence in a narrow place: the words wrap instead of running off the edge.
  canWrap?: boolean
  children: ReactNode
}

export function Tag({ glyph = TagGlyph.plain, canWrap = false, children }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex gap-2 font-ui text-label font-medium text-text',
        canWrap ? 'items-start leading-snug' : 'items-center whitespace-nowrap',
      )}
    >
      {glyph === TagGlyph.plain ? null : <GlyphSquare shape={glyph} />}
      {children}
    </span>
  )
}
