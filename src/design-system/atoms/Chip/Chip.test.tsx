import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Chip } from './Chip'

describe('Chip', () => {
  it('calls onClick', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Chip onClick={onClick}>Deep answer</Chip>)

    await user.click(screen.getByRole('button', { name: 'Deep answer' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('shows the pressed state only when it is a toggle', () => {
    const { rerender } = render(<Chip>Deep answer</Chip>)
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')

    rerender(<Chip isPressed={false}>Deep answer</Chip>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')

    rerender(<Chip isPressed={true}>Deep answer</Chip>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('does not click when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Chip disabled onClick={onClick}>
        MN 1
      </Chip>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('works from the keyboard', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Chip onClick={onClick}>Deep answer</Chip>)

    await user.tab()
    await user.keyboard('{Enter}')
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('keeps its text as the name when it has an icon', () => {
    render(<Chip icon="attach">Attach file</Chip>)
    expect(screen.getByRole('button', { name: 'Attach file' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Chip>Default</Chip>
        <Chip isPressed>Pressed</Chip>
        <Chip disabled>Disabled</Chip>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
