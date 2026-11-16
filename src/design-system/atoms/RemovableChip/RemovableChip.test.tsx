import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { RemovableChip } from './RemovableChip'

describe('RemovableChip', () => {
  it('shows its label and a named remove button', () => {
    render(<RemovableChip label="notes.pdf" removeLabel="Remove notes.pdf" onRemove={() => {}} />)
    expect(screen.getByText('notes.pdf')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Remove notes.pdf' })).toBeInTheDocument()
  })

  it('removes when the button is clicked', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<RemovableChip label="notes.pdf" removeLabel="Remove notes.pdf" onRemove={onRemove} />)

    await user.click(screen.getByRole('button'))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('removes from the keyboard', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<RemovableChip label="notes.pdf" removeLabel="Remove notes.pdf" onRemove={onRemove} />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <RemovableChip label="notes.pdf" removeLabel="Remove notes.pdf" onRemove={() => {}} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
