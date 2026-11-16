import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { CountBadge } from './CountBadge'

describe('CountBadge', () => {
  it('shows the number', () => {
    render(<CountBadge count={3} />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('tells assistive technology what is counted', () => {
    render(<CountBadge count={3} label="notes" />)
    expect(screen.getByText('3 notes')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CountBadge count={3} label="notes" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
