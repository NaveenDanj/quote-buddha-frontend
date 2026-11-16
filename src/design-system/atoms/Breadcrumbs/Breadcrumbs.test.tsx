import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Breadcrumbs } from './Breadcrumbs'

const sampleCrumbs = [
  { label: 'Dīgha Nikāya', href: '#nikaya' },
  { label: 'DN 1', href: '#dn1' },
  { label: 'Section 1' },
]

describe('Breadcrumbs', () => {
  it('is a named navigation with the crumbs in order', () => {
    render(<Breadcrumbs crumbs={sampleCrumbs} />)
    const trail = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(trail).toHaveTextContent('Dīgha NikāyaDN 1Section 1')
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('makes earlier crumbs links', () => {
    render(<Breadcrumbs crumbs={sampleCrumbs} />)
    expect(screen.getByRole('link', { name: 'DN 1' })).toHaveAttribute('href', '#dn1')
  })

  it('marks the last crumb as the current place and does not link it', () => {
    render(<Breadcrumbs crumbs={sampleCrumbs} />)
    const current = screen.getByText('Section 1')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('link', { name: 'Section 1' })).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Breadcrumbs crumbs={sampleCrumbs} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
