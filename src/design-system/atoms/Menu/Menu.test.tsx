import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { IconButton } from '@ds/atoms/IconButton'
import { Menu } from './Menu'

function renderMenu(onRename = vi.fn(), onShare = vi.fn()) {
  render(
    <Menu
      trigger={<IconButton icon="more" label="Chat options" />}
      items={[
        { label: 'Rename', onSelect: onRename },
        { label: 'Share', onSelect: onShare },
      ]}
    />,
  )
}

// axe's "content must be in a landmark" rule is about whole pages, so it is off for a single component.
const componentCheckOptions = { rules: { region: { enabled: false } } }

describe('Menu', () => {
  it('is closed until the trigger is used', () => {
    renderMenu()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens from the trigger and lists its items', async () => {
    const user = userEvent.setup()
    renderMenu()

    await user.click(screen.getByRole('button', { name: 'Chat options' }))

    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Share' })).toBeInTheDocument()
  })

  it('runs the chosen item and closes', async () => {
    const onShare = vi.fn()
    const user = userEvent.setup()
    renderMenu(vi.fn(), onShare)

    await user.click(screen.getByRole('button', { name: 'Chat options' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Share' }))

    expect(onShare).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('works from the keyboard: open, arrow down, Enter', async () => {
    const onShare = vi.fn()
    const user = userEvent.setup()
    renderMenu(vi.fn(), onShare)

    await user.tab()
    await user.keyboard('{Enter}')
    await screen.findByRole('menu')
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')

    expect(onShare).toHaveBeenCalledTimes(1)
  })

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderMenu()
    const trigger = screen.getByRole('button', { name: 'Chat options' })

    await user.click(trigger)
    await screen.findByRole('menu')
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('has no accessibility violations', async () => {
    const user = userEvent.setup()
    renderMenu()
    await user.click(screen.getByRole('button', { name: 'Chat options' }))
    await screen.findByRole('menu')
    expect(await axe(document.body, componentCheckOptions)).toHaveNoViolations()
  })
})
