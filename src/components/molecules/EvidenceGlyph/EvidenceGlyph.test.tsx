import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { EvidenceState, evidenceStates } from '@domain'
import { EvidenceGlyph } from './EvidenceGlyph'

function readClassNames(state: EvidenceState): string {
  const { container } = render(<EvidenceGlyph state={state} />)
  return container.firstElementChild?.className ?? ''
}

describe('EvidenceGlyph', () => {
  it('is hidden from assistive technology, because the words come next to it', () => {
    const { container } = render(<EvidenceGlyph state={EvidenceState.directQuote} />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('draws the same shape for every state that has no support', () => {
    const noSupportStates = [
      EvidenceState.notUsed,
      EvidenceState.removed,
      EvidenceState.notEstablished,
      EvidenceState.notYetIncluded,
    ]
    const looks = noSupportStates.map(readClassNames)
    expect(new Set(looks).size).toBe(1)
  })

  it('draws a quote, an unverified quote and no support differently', () => {
    const looks = [EvidenceState.directQuote, EvidenceState.notVerified, EvidenceState.removed].map(
      readClassNames,
    )
    expect(new Set(looks).size).toBe(looks.length)
  })

  it('has no accessibility violations for any state', async () => {
    const { container } = render(
      <>
        {evidenceStates.map((state) => (
          <EvidenceGlyph key={state} state={state} />
        ))}
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
