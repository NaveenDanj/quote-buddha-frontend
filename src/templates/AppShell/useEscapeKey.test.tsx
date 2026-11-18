import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { useEscapeKey } from './useEscapeKey'

type AreaExampleProps = {
  onEscape: () => void
}

function AreaExample({ onEscape }: AreaExampleProps) {
  const areaRef = useRef<HTMLDivElement>(null)
  useEscapeKey(areaRef, onEscape)

  return (
    <>
      <div ref={areaRef}>
        <button>Inside</button>
      </div>
      <button>Outside</button>
    </>
  )
}

describe('useEscapeKey', () => {
  it('calls onEscape when Escape is pressed inside the area', async () => {
    const onEscape = vi.fn()
    const user = userEvent.setup()
    render(<AreaExample onEscape={onEscape} />)

    screen.getByRole('button', { name: 'Inside' }).focus()
    await user.keyboard('{Escape}')

    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  it('ignores Escape pressed outside the area, such as in a dialog', async () => {
    const onEscape = vi.fn()
    const user = userEvent.setup()
    render(<AreaExample onEscape={onEscape} />)

    screen.getByRole('button', { name: 'Outside' }).focus()
    await user.keyboard('{Escape}')

    expect(onEscape).not.toHaveBeenCalled()
  })

  it('ignores other keys', async () => {
    const onEscape = vi.fn()
    const user = userEvent.setup()
    render(<AreaExample onEscape={onEscape} />)

    screen.getByRole('button', { name: 'Inside' }).focus()
    await user.keyboard('a')

    expect(onEscape).not.toHaveBeenCalled()
  })
})
