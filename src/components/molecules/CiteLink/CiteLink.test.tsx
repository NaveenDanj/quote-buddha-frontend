import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { CiteLink } from './CiteLink'

describe('CiteLink', () => {
  it('shows its label as a button', () => {
    render(<CiteLink citationId="sample:1" label="Sample citation" onOpen={() => {}} />)
    expect(screen.getByRole('button', { name: 'Sample citation' })).toBeInTheDocument()
  })

  it('opens the source by its citation id when clicked', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<CiteLink citationId="sample:1" label="Sample citation" onOpen={onOpen} />)

    await user.click(screen.getByRole('button'))

    expect(onOpen).toHaveBeenCalledWith('sample:1')
  })

  it('works from the keyboard', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<CiteLink citationId="sample:1" label="Sample citation" onOpen={onOpen} />)

    await user.tab()
    await user.keyboard('{Enter}')

    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CiteLink citationId="sample:1" label="Sample citation" onOpen={() => {}} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
