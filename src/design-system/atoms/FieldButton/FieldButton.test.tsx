import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { FieldButton } from './FieldButton'

describe('FieldButton', () => {
  it('is a button that runs its action', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<FieldButton onClick={onClick}>Search chats and texts</FieldButton>)

    await user.click(screen.getByRole('button', { name: 'Search chats and texts' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FieldButton>Search chats and texts</FieldButton>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
