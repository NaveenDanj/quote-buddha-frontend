import { GlyphSquare } from '@ds/atoms/GlyphSquare'
import { getEvidenceShape, type EvidenceState } from '@domain'

// Only the square. Use it where the words are written next to it already (a legend, a matrix cell).
export function EvidenceGlyph({ state }: { state: EvidenceState }) {
  return <GlyphSquare shape={getEvidenceShape(state)} />
}
