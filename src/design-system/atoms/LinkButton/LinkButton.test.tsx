import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { LinkButton } from './LinkButton'

describe('LinkButton', () => {
  it('is a button that runs its action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<LinkButton onClick={onClick}>Open the passage</LinkButton>)

    await user.click(screen.getByRole('button', { name: 'Open the passage' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<LinkButton>Open the passage</LinkButton>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
