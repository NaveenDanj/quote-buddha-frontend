import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { GlyphShape } from '@ds/atoms/GlyphSquare'
import { EvidenceState, evidenceStates, getEvidenceShape } from '@domain'
import { evidenceStateText } from '@wording'
import { EvidenceTag } from './EvidenceTag'

describe('EvidenceTag', () => {
  it('says every state in words', () => {
    for (const state of evidenceStates) {
      const { unmount } = render(<EvidenceTag state={state} />)
      expect(screen.getByText(evidenceStateText[state])).toBeInTheDocument()
      unmount()
    }
  })

  it('shows a square next to the words, so the shape is a second cue', () => {
    const { container } = render(<EvidenceTag state={EvidenceState.removed} />)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('never shows a failed claim with the filled square of a direct quote', () => {
    const { container: quoteContainer } = render(<EvidenceTag state={EvidenceState.directQuote} />)
    const { container: removedContainer } = render(<EvidenceTag state={EvidenceState.removed} />)
    const quoteSquare = quoteContainer.querySelector('[aria-hidden="true"]')
    const removedSquare = removedContainer.querySelector('[aria-hidden="true"]')
    expect(quoteSquare?.className).not.toBe(removedSquare?.className)
  })

  it('only asks the atom for shapes it can draw', () => {
    const drawableShapes: string[] = Object.values(GlyphShape)
    for (const state of evidenceStates) {
      expect(drawableShapes).toContain(getEvidenceShape(state))
    }
  })

  it('has no accessibility violations for any state', async () => {
    const { container } = render(
      <>
        {evidenceStates.map((state) => (
          <EvidenceTag key={state} state={state} />
        ))}
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
