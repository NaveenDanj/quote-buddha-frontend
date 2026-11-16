import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Tag, TagGlyph } from './Tag'

describe('Tag', () => {
  it('always shows its label in words', () => {
    render(<Tag glyph={TagGlyph.hatched}>Not verified</Tag>)
    expect(screen.getByText('Not verified')).toBeInTheDocument()
  })

  it('hides the square from assistive technology', () => {
    const { container } = render(<Tag glyph={TagGlyph.filled}>Direct quote</Tag>)
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('draws no square for a plain tag', () => {
    const { container } = render(<Tag glyph={TagGlyph.plain}>Deep answer</Tag>)
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument()
  })

  it('gives each shape a different look, so state is not carried by color', () => {
    const { container } = render(
      <>
        <Tag glyph={TagGlyph.filled}>A</Tag>
        <Tag glyph={TagGlyph.hatched}>B</Tag>
        <Tag glyph={TagGlyph.dashed}>C</Tag>
      </>,
    )
    const squares = container.querySelectorAll<HTMLElement>('[aria-hidden="true"]')
    // jsdom cannot draw, so compare the class lists: the three shapes must not match.
    const looks = Array.from(squares).map((square) => square.className)
    expect(new Set(looks).size).toBe(3)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Tag glyph={TagGlyph.dashed}>Not established</Tag>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
