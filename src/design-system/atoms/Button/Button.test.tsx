import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('shows its text and calls onClick', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Send report</Button>)

    await user.click(screen.getByRole('button', { name: 'Send report' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not click when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button disabled onClick={onClick}>
        Send report
      </Button>,
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('does not submit a form unless asked to', async () => {
    const onSubmit = vi.fn((event) => event.preventDefault())
    const user = userEvent.setup()
    render(
      <form onSubmit={onSubmit}>
        <Button>Plain</Button>
        <Button type="submit">Submit</Button>
      </form>,
    )

    await user.click(screen.getByRole('button', { name: 'Plain' }))
    expect(onSubmit).not.toHaveBeenCalled()

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('keeps its text as the name when it has an icon', () => {
    render(<Button leadingIcon="add">New chat</Button>)
    expect(screen.getByRole('button', { name: 'New chat' })).toBeInTheDocument()
  })

  it('has no accessibility violations in every variant', async () => {
    const { container } = render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">Text</Button>
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
