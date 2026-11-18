import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef, useState } from 'react'
import { describe, expect, it } from 'vitest'
import { useDrawerFocus } from './useDrawerFocus'

function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  useDrawerFocus(isOpen, drawerRef)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle menu</button>
      <div ref={drawerRef} tabIndex={-1} aria-label="Drawer" role="region">
        <button>Inside the drawer</button>
      </div>
    </>
  )
}

describe('useDrawerFocus', () => {
  it('moves focus into the drawer when it opens', async () => {
    const user = userEvent.setup()
    render(<DrawerExample />)

    await user.click(screen.getByRole('button', { name: 'Toggle menu' }))

    expect(screen.getByRole('region', { name: 'Drawer' })).toHaveFocus()
  })

  it('gives focus back to what opened it when it closes', async () => {
    const user = userEvent.setup()
    render(<DrawerExample />)
    const opener = screen.getByRole('button', { name: 'Toggle menu' })

    await user.click(opener)
    await user.click(opener)

    expect(opener).toHaveFocus()
  })

  it('leaves focus alone while the drawer stays closed', () => {
    render(<DrawerExample />)
    expect(document.body).toHaveFocus()
  })
})
