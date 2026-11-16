import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('keeps the text in the page for assistive technology', () => {
    render(<VisuallyHidden>Verified quotation</VisuallyHidden>)
    expect(screen.getByText('Verified quotation')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<VisuallyHidden>Verified quotation</VisuallyHidden>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
