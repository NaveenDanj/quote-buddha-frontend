import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('shows the title', () => {
    render(<EmptyState title="Nothing here yet" />)
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument()
  })

  it('shows the description only when one is given', () => {
    const { rerender } = render(<EmptyState title="Nothing here yet" />)
    expect(screen.queryByText('Add something.')).not.toBeInTheDocument()

    rerender(<EmptyState title="Nothing here yet" description="Add something." />)
    expect(screen.getByText('Add something.')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <EmptyState icon="ask" title="Nothing here yet" description="Add something." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
