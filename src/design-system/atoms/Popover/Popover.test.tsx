import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { IconButton } from '@ds/atoms/IconButton'
import { Popover } from './Popover'

function renderPopover() {
  render(
    <Popover
      trigger={<IconButton icon="settings" label="Reading settings" />}
      label="Reading settings panel"
    >
      <p>Sample panel content</p>
    </Popover>,
  )
}

// axe's "content must be in a landmark" rule is about whole pages, so it is off for a single component.
const componentCheckOptions = { rules: { region: { enabled: false } } }

describe('Popover', () => {
  it('is closed until the trigger is used', () => {
    renderPopover()
    expect(screen.queryByText('Sample panel content')).not.toBeInTheDocument()
  })

  it('opens from the trigger, with a name', async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.click(screen.getByRole('button', { name: 'Reading settings' }))

    expect(await screen.findByRole('dialog', { name: 'Reading settings panel' })).toHaveTextContent(
      'Sample panel content',
    )
  })

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderPopover()
    const trigger = screen.getByRole('button', { name: 'Reading settings' })

    await user.click(trigger)
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('opens from the keyboard', async () => {
    const user = userEvent.setup()
    renderPopover()

    await user.tab()
    await user.keyboard('{Enter}')

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const user = userEvent.setup()
    renderPopover()
    await user.click(screen.getByRole('button', { name: 'Reading settings' }))
    await screen.findByRole('dialog')
    expect(await axe(document.body, componentCheckOptions)).toHaveNoViolations()
  })
})
