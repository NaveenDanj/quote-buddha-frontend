import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Icon } from './Icon'

describe('Icon', () => {
  it('is hidden from assistive technology when it has no label', () => {
    const { container } = render(<Icon name="search" />)
    const drawing = container.querySelector('svg')
    expect(drawing).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('is announced as an image when it has a label', () => {
    render(<Icon name="verify" label="Verified" />)
    expect(screen.getByRole('img', { name: 'Verified' })).toBeInTheDocument()
  })

  it('draws the stroke from the token', () => {
    const { container } = render(<Icon name="close" />)
    // jsdom cannot work out var(), so check the written style text instead.
    expect(container.querySelector('svg')?.getAttribute('style')).toContain('var(--icon-stroke)')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Icon name="verify" label="Verified" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
