import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { wording } from '@wording'
import { SourceChip } from './SourceChip'

describe('SourceChip', () => {
  it('shows its number and label', () => {
    render(<SourceChip number={2} label="Sample source" onOpen={() => {}} />)
    expect(screen.getByRole('button', { name: '2 Sample source' })).toBeInTheDocument()
  })

  it('opens its source by number', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<SourceChip number={2} label="Sample source" onOpen={onOpen} />)

    await user.click(screen.getByRole('button'))

    expect(onOpen).toHaveBeenCalledWith(2)
  })

  it('says "not yet included" in words and does not open when the text is planned', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<SourceChip number={3} label="Planned sample" onOpen={onOpen} isIncluded={false} />)

    expect(screen.getByText(wording.notYetIncluded)).toBeInTheDocument()
    await user.click(screen.getByRole('button'))
    expect(onOpen).not.toHaveBeenCalled()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <>
        <SourceChip number={1} label="Sample source" onOpen={() => {}} />
        <SourceChip number={2} label="Planned sample" onOpen={() => {}} isIncluded={false} />
      </>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
