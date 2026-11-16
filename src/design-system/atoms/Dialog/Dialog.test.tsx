import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

function DialogWithOpenButton() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} title="Share this answer">
        <button>Copy link</button>
      </Dialog>
    </>
  )
}

describe('Dialog', () => {
  it('is a dialog named by its title when open', () => {
    render(
      <Dialog isOpen onOpenChange={() => {}} title="Share this answer">
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog', { name: 'Share this answer' })).toBeInTheDocument()
  })

  it('shows nothing when closed', () => {
    render(
      <Dialog isOpen={false} onOpenChange={() => {}} title="Share this answer">
        Content
      </Dialog>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('links its description', () => {
    render(
      <Dialog
        isOpen
        onOpenChange={() => {}}
        title="Share"
        description="Anyone with the link can read."
      >
        Content
      </Dialog>,
    )
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('Anyone with the link can read.')
  })

  it('asks to close from the close button and from Escape', async () => {
    const onOpenChange = vi.fn()
    const user = userEvent.setup()
    render(
      <Dialog isOpen onOpenChange={onOpenChange} title="Share">
        Content
      </Dialog>,
    )

    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onOpenChange).toHaveBeenLastCalledWith(false)

    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledTimes(2)
  })

  it('moves focus into the dialog, and back to the opener when it closes', async () => {
    const user = userEvent.setup()
    render(<DialogWithOpenButton />)
    const opener = screen.getByRole('button', { name: 'Open dialog' })

    await user.click(opener)
    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('keeps Tab inside the dialog', async () => {
    const user = userEvent.setup()
    render(<DialogWithOpenButton />)
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    await user.tab()
    await user.tab()
    await user.tab()

    expect(screen.getByRole('dialog')).toContainElement(document.activeElement as HTMLElement)
  })

  it('has no accessibility violations', async () => {
    const { baseElement } = render(
      <Dialog isOpen onOpenChange={() => {}} title="Share this answer" description="Sample">
        Content
      </Dialog>,
    )
    expect(await axe(baseElement)).toHaveNoViolations()
  })
})
