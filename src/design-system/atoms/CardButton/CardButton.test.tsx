import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { CardButton } from './CardButton'

describe('CardButton', () => {
  it('is a button that runs its action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CardButton onClick={onClick}>Verify a quote</CardButton>)

    await user.click(screen.getByRole('button', { name: 'Verify a quote' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CardButton>Verify a quote</CardButton>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
