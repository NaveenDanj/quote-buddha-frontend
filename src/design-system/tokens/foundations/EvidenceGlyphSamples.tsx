import { Tag, TagGlyph } from '@ds/atoms/Tag'

// The three shapes from the Tag atom, with what each one means. The real evidence molecule comes later.
export function EvidenceGlyphSamples() {
  return (
    <ul className="grid gap-3 font-ui text-ui">
      <li className="flex items-center gap-3">
        <Tag glyph={TagGlyph.filled}>Filled</Tag>
        <span className="text-text-muted">Direct quote</span>
      </li>
      <li className="flex items-center gap-3">
        <Tag glyph={TagGlyph.hatched}>Hatched</Tag>
        <span className="text-text-muted">Not verified</span>
      </li>
      <li className="flex items-center gap-3">
        <Tag glyph={TagGlyph.dashed}>Dashed outline</Tag>
        <span className="text-text-muted">
          No support, removed, not used, abstained, or not yet included
        </span>
      </li>
    </ul>
  )
}
