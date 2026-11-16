// Plain squares that show the three glyph patterns. The real EvidenceGlyph molecule comes in a later plan.
const glyphs = [
  { name: 'Filled', meaning: 'Direct quote', className: 'bg-text border-text' },
  { name: 'Hatched', meaning: 'Not verified', className: 'border-text-muted', hatched: true },
  {
    name: 'Dashed outline',
    meaning: 'No support, removed, not used, abstained, or not yet included',
    className: 'border-dashed border-text-muted',
  },
]

export function EvidenceGlyphSamples() {
  return (
    <ul className="grid gap-3 font-ui text-ui">
      {glyphs.map((glyph) => (
        <li key={glyph.name} className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`inline-block border text-text ${glyph.className}`}
            style={{
              width: 'var(--glyph-size)',
              height: 'var(--glyph-size)',
              borderWidth: 'var(--glyph-outline)',
              backgroundImage: glyph.hatched ? 'var(--pattern-hatch)' : undefined,
            }}
          />
          <span className="font-medium">{glyph.name}</span>
          <span className="text-text-muted">{glyph.meaning}</span>
        </li>
      ))}
    </ul>
  )
}
