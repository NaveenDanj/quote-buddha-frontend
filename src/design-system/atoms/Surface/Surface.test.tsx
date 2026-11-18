import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Surface, SurfaceLook, SurfaceSpace } from './Surface'

function readClassNames(look: SurfaceLook): string {
  const { container } = render(<Surface look={look}>Content</Surface>)
  return container.firstElementChild?.className ?? ''
}

describe('Surface', () => {
  it('is a plain div by default, with no box around it', () => {
    const { container } = render(<Surface>Content</Surface>)
    const surface = container.firstElementChild
    expect(surface?.tagName).toBe('DIV')
    expect(surface?.className).not.toMatch(/border|bg-/)
  })

  it('can be another element, such as a named section', () => {
    render(
      <Surface as="section" aria-label="Sample group">
        Content
      </Surface>,
    )
    expect(screen.getByRole('region', { name: 'Sample group' })).toHaveTextContent('Content')
  })

  it('looks different for every look', () => {
    const looks = Object.values(SurfaceLook).map(readClassNames)
    expect(new Set(looks).size).toBe(looks.length)
  })

  it('uses a dashed outline for the dashed look, so "not established" does not rely on color', () => {
    expect(readClassNames(SurfaceLook.dashed)).toContain('border-dashed')
  })

  it('keeps extra classes and passes attributes through', () => {
    const { container } = render(
      <Surface id="sample" className="max-w-(--measure-reading)">
        Content
      </Surface>,
    )
    expect(container.firstElementChild).toHaveAttribute('id', 'sample')
    expect(container.firstElementChild).toHaveClass('max-w-(--measure-reading)')
  })

  it('has padding and gap only when asked', () => {
    const { container } = render(
      <Surface padding={SurfaceSpace.large} gap={SurfaceSpace.medium}>
        Content
      </Surface>,
    )
    expect(container.firstElementChild).toHaveClass('p-page', 'gap-block')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Surface as="section" look={SurfaceLook.dashed} aria-label="Sample group">
        Content
      </Surface>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
