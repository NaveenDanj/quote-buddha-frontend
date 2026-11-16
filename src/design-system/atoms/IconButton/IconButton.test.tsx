import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from './IconButton'

describe('IconButton', () => {
  it('is found by its label', () => {
    render(<IconButton icon="copy" label="Copy answer" />)
    expect(screen.getByRole('button', { name: 'Copy answer' })).toBeInTheDocument()
  })

  it('calls onClick when clicked and when Enter is pressed', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<IconButton icon="copy" label="Copy answer" onClick={onClick} />)
    const button = screen.getByRole('button', { name: 'Copy answer' })

    await user.click(button)
    button.focus()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('shows the pressed state only when it is a toggle', () => {
    const { rerender } = render(<IconButton icon="copy" label="Copy answer" />)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')

    rerender(<IconButton icon="copy" label="Copy answer" isPressed={true} />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not click when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<IconButton icon="copy" label="Copy answer" disabled onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not submit a form by accident', () => {
    render(<IconButton icon="copy" label="Copy answer" />)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<IconButton icon="copy" label="Copy answer" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
