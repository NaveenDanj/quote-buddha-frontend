import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Meter } from './Meter'

describe('Meter', () => {
  it('has a name and a value for assistive technology', () => {
    render(<Meter value={2} max={5} label="Passages checked" />)
    const meter = screen.getByRole('meter', { name: 'Passages checked' })
    expect(meter).toHaveAttribute('aria-valuenow', '2')
    expect(meter).toHaveAttribute('aria-valuemax', '5')
  })

  it('fills the bar by the share of the maximum', () => {
    render(<Meter value={2} max={5} label="Passages checked" />)
    const fill = screen.getByRole('meter').firstElementChild
    expect(fill).toHaveStyle({ width: '40%' })
  })

  it('never draws outside the bar', () => {
    const { rerender } = render(<Meter value={150} label="Over" />)
    expect(screen.getByRole('meter').firstElementChild).toHaveStyle({ width: '100%' })

    rerender(<Meter value={-5} label="Under" />)
    expect(screen.getByRole('meter').firstElementChild).toHaveStyle({ width: '0%' })
  })

  it('keeps the announced value inside the range', () => {
    render(<Meter value={150} max={100} label="Over" />)
    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuenow', '100')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Meter value={40} label="Passages checked" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
