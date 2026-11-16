import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { ListRow } from './ListRow'

describe('ListRow', () => {
  it('is a list item holding a button when it has onClick', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <ul>
        <ListRow onClick={onClick}>Sample chat</ListRow>
      </ul>,
    )

    await user.click(screen.getByRole('button', { name: 'Sample chat' }))

    expect(screen.getByRole('listitem')).toBeInTheDocument()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('holds a link when it has an href', () => {
    render(
      <ul>
        <ListRow href="/chats/1">Sample chat</ListRow>
      </ul>,
    )
    expect(screen.getByRole('link', { name: 'Sample chat' })).toHaveAttribute('href', '/chats/1')
  })

  it('marks the selected row as current', () => {
    render(
      <ul>
        <ListRow onClick={() => {}} isSelected>
          Selected chat
        </ListRow>
        <ListRow onClick={() => {}}>Other chat</ListRow>
      </ul>,
    )
    expect(screen.getByRole('button', { name: 'Selected chat' })).toHaveAttribute(
      'aria-current',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Other chat' })).not.toHaveAttribute('aria-current')
  })

  it('shows what is at the far end of the row', () => {
    render(
      <ul>
        <ListRow onClick={() => {}} trailing={<span>4</span>}>
          Sample chat
        </ListRow>
      </ul>,
    )
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('works from the keyboard', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <ul>
        <ListRow onClick={onClick}>Sample chat</ListRow>
      </ul>,
    )

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ul>
        <ListRow onClick={() => {}}>Sample chat</ListRow>
        <ListRow href="#chat" isSelected>
          Sample link
        </ListRow>
      </ul>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
