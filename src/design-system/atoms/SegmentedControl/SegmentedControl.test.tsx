import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { SegmentedControl } from './SegmentedControl'

const depthOptions = [
  { value: 'quick', label: 'Quick' },
  { value: 'deep', label: 'Deep' },
]

describe('SegmentedControl', () => {
  it('names the group and presses only the chosen option', () => {
    render(
      <SegmentedControl
        label="Answer depth"
        options={depthOptions}
        value="quick"
        onValueChange={() => {}}
      />,
    )
    expect(screen.getByRole('group', { name: 'Answer depth' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Quick' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Deep' })).toHaveAttribute('aria-pressed', 'false')
  })

  it('reports the option that was clicked', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SegmentedControl
        label="Answer depth"
        options={depthOptions}
        value="quick"
        onValueChange={onValueChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Deep' }))

    expect(onValueChange).toHaveBeenCalledWith('deep')
  })

  it('works from the keyboard', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(
      <SegmentedControl
        label="Answer depth"
        options={depthOptions}
        value="quick"
        onValueChange={onValueChange}
      />,
    )

    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')

    expect(onValueChange).toHaveBeenCalledWith('deep')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <SegmentedControl
        label="Answer depth"
        options={depthOptions}
        value="quick"
        onValueChange={() => {}}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
