import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { FileChip } from './FileChip'

describe('FileChip', () => {
  it('shows the file name', () => {
    render(<FileChip fileName="notes.pdf" removeLabel="Remove notes.pdf" onRemove={() => {}} />)
    expect(screen.getByText('notes.pdf')).toBeInTheDocument()
  })

  it('removes the file from its remove button', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(<FileChip fileName="notes.pdf" removeLabel="Remove notes.pdf" onRemove={onRemove} />)

    await user.click(screen.getByRole('button', { name: 'Remove notes.pdf' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <FileChip fileName="notes.pdf" removeLabel="Remove notes.pdf" onRemove={() => {}} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
