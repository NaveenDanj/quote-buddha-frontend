import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { GlyphShape, GlyphSquare } from './GlyphSquare'

function readClassNames(shape: GlyphShape): string {
  const { container } = render(<GlyphSquare shape={shape} />)
  return container.firstElementChild?.className ?? ''
}

describe('GlyphSquare', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<GlyphSquare shape={GlyphShape.filled} />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('looks different for every shape, so meaning is not carried by color', () => {
    const looks = Object.values(GlyphShape).map(readClassNames)
    expect(new Set(looks).size).toBe(looks.length)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<GlyphSquare shape={GlyphShape.hatched} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
