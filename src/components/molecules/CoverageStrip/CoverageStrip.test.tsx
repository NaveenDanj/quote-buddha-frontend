import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { CoverageStrip } from './CoverageStrip'

function countSquares(container: HTMLElement, className: string): number {
  return container.querySelectorAll(`[aria-hidden="true"].${className}`).length
}

describe('CoverageStrip', () => {
  it('says the coverage in words and names the squares the same way', () => {
    render(
      <CoverageStrip
        title="Sample collection"
        summary="1 of 4 sample texts"
        includedCount={1}
        totalCount={4}
      />,
    )
    expect(screen.getByText('Sample collection')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '1 of 4 sample texts' })).toBeInTheDocument()
  })

  it('draws one square for every text', () => {
    const { container } = render(
      <CoverageStrip
        title="Sample collection"
        summary="1 of 4 sample texts"
        includedCount={1}
        totalCount={4}
      />,
    )
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(4)
  })

  it('draws included texts filled and the others as dashed outlines', () => {
    const { container } = render(
      <CoverageStrip
        title="Sample collection"
        summary="3 of 5 sample texts"
        includedCount={3}
        totalCount={5}
      />,
    )
    expect(countSquares(container, 'bg-accent')).toBe(3)
    expect(countSquares(container, 'border-dashed')).toBe(2)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CoverageStrip
        title="Sample collection"
        summary="1 of 4 sample texts"
        includedCount={1}
        totalCount={4}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
