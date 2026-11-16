import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { wording } from '@wording'
import { CoverageStrip } from './CoverageStrip'

function renderStrip(includedCount: number, totalCount: number) {
  return render(
    <CoverageStrip
      title="Sample collection"
      summary={`${includedCount} of ${totalCount} sample texts`}
      includedCount={includedCount}
      totalCount={totalCount}
    />,
  )
}

function countSquares(container: HTMLElement, className: string): number {
  return container.querySelectorAll(`[aria-hidden="true"] > .${className}`).length
}

describe('CoverageStrip', () => {
  it('says the coverage in words, including how many texts are not yet included', () => {
    renderStrip(1, 4)
    expect(screen.getByText('1 of 4 sample texts')).toBeInTheDocument()
    expect(screen.getByText(`3 ${wording.notYetIncluded}`)).toBeInTheDocument()
  })

  it('draws one square for every text, hidden from screen readers', () => {
    const { container } = renderStrip(1, 4)
    expect(container.querySelectorAll('[aria-hidden="true"] > span')).toHaveLength(4)
  })

  it('draws included texts filled and the others as dashed outlines', () => {
    const { container } = renderStrip(3, 5)
    expect(countSquares(container, 'bg-accent')).toBe(3)
    expect(countSquares(container, 'border-dashed')).toBe(2)
  })

  it('does not say anything is missing when every text is included', () => {
    renderStrip(4, 4)
    expect(screen.queryByText(new RegExp(wording.notYetIncluded))).not.toBeInTheDocument()
  })

  it('never draws more filled squares than there are texts', () => {
    const { container } = renderStrip(9, 4)
    expect(countSquares(container, 'bg-accent')).toBe(4)
  })

  it('has no accessibility violations', async () => {
    const { container } = renderStrip(1, 4)
    expect(await axe(container)).toHaveNoViolations()
  })
})
