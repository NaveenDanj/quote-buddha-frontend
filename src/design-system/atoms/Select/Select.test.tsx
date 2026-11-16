import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Select } from './Select'

const textSizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
]

describe('Select', () => {
  it('is found by its label and shows the placeholder', () => {
    render(<Select label="Reading size" options={textSizes} placeholder="Choose a size" />)
    const trigger = screen.getByRole('combobox', { name: 'Reading size' })
    expect(trigger).toHaveTextContent('Choose a size')
  })

  it('opens, lets the person choose, and reports the choice', async () => {
    const onValueChange = vi.fn()
    const user = userEvent.setup()
    render(<Select label="Reading size" options={textSizes} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('combobox', { name: 'Reading size' }))
    await user.click(await screen.findByRole('option', { name: 'Large' }))

    expect(onValueChange).toHaveBeenCalledWith('large')
    expect(screen.getByRole('combobox')).toHaveTextContent('Large')
  })

  it('works from the keyboard and closes with Escape', async () => {
    const user = userEvent.setup()
    render(<Select label="Reading size" options={textSizes} />)

    await user.tab()
    await user.keyboard('{Enter}')
    expect(await screen.findByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveFocus()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Select label="Reading size" options={textSizes} disabled />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('explains an error in words', () => {
    render(<Select label="Reading size" options={textSizes} errorText="Choose a reading size." />)
    expect(screen.getByRole('combobox')).toHaveAccessibleDescription('Choose a reading size.')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Select label="Reading size" options={textSizes} hint="Applies to answers." />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
