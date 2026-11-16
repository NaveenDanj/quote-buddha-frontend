import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { ContextChip } from './ContextChip'

describe('ContextChip', () => {
  it('shows what the question is about', () => {
    render(
      <ContextChip
        label="On sample section 5.2"
        removeLabel="Remove context"
        onRemove={() => {}}
      />,
    )
    expect(screen.getByText('On sample section 5.2')).toBeInTheDocument()
  })

  it('clears the context from its remove button', async () => {
    const onRemove = vi.fn()
    const user = userEvent.setup()
    render(
      <ContextChip
        label="On sample section 5.2"
        removeLabel="Remove context"
        onRemove={onRemove}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Remove context' }))

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('has a dashed outline, like text that is only context', () => {
    const { container } = render(
      <ContextChip
        label="On sample section 5.2"
        removeLabel="Remove context"
        onRemove={() => {}}
      />,
    )
    expect(container.firstElementChild).toHaveClass('border-dashed')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <ContextChip
        label="On sample section 5.2"
        removeLabel="Remove context"
        onRemove={() => {}}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
