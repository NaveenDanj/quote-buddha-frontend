import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('is found by its label', () => {
    render(<Checkbox label="Show diacritics" />)
    expect(screen.getByRole('checkbox', { name: 'Show diacritics' })).not.toBeChecked()
  })

  it('toggles from a click on the box or on the label, and reports the new state', async () => {
    const onCheckedChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Show diacritics" onCheckedChange={onCheckedChange} />)

    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenLastCalledWith(true)

    await user.click(screen.getByText('Show diacritics'))
    expect(onCheckedChange).toHaveBeenLastCalledWith(false)
  })

  it('toggles with the Space key', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Show diacritics" />)

    await user.tab()
    await user.keyboard(' ')

    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('does not toggle when disabled', async () => {
    const onCheckedChange = vi.fn()
    const user = userEvent.setup()
    render(<Checkbox label="Show diacritics" disabled onCheckedChange={onCheckedChange} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Disabled" disabled />
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
