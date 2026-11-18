import type { ReactNode } from 'react'
import { GlyphShape, GlyphSquare } from '@ds/atoms/GlyphSquare'

export const TagGlyph = { ...GlyphShape, plain: 'plain' } as const
export type TagGlyph = (typeof TagGlyph)[keyof typeof TagGlyph]

type TagProps = {
  glyph?: TagGlyph
  children: ReactNode
}

export function Tag({ glyph = TagGlyph.plain, children }: TagProps) {
  return (
    <span className="inline-flex items-center gap-2 font-ui text-label font-medium whitespace-nowrap text-text">
      {glyph === TagGlyph.plain ? null : <GlyphSquare shape={glyph} />}
      {children}
    </span>
  )
}
