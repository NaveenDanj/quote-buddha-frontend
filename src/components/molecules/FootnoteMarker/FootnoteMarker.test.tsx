import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { FootnoteMarker } from './FootnoteMarker'

describe('FootnoteMarker', () => {
  it('shows the number and is named after the source it opens', () => {
    render(<FootnoteMarker number={2} onOpen={() => {}} />)
    const marker = screen.getByRole('button', { name: 'Source 2' })
    expect(marker).toHaveTextContent('[2]')
  })

  it('opens its source by number when clicked', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<FootnoteMarker number={2} onOpen={onOpen} />)

    await user.click(screen.getByRole('button'))

    expect(onOpen).toHaveBeenCalledWith(2)
  })

  it('works from the keyboard', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<FootnoteMarker number={2} onOpen={onOpen} />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <p>
        Sample sentence.
        <FootnoteMarker number={1} onOpen={() => {}} />
      </p>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
