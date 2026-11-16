import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  it('shows the product name', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Quote Buddha' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<App />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
