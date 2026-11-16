import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { GlossChip } from './GlossChip'

describe('GlossChip', () => {
  it('shows the Pali term, marked as Pali, with its gloss', () => {
    render(<GlossChip pali="diṭṭhi" gloss="view" onOpen={() => {}} />)
    expect(screen.getByText('diṭṭhi')).toHaveAttribute('lang', 'pi')
    expect(screen.getByRole('button')).toHaveTextContent('view')
  })

  it('opens the term by its Pali word', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(<GlossChip pali="diṭṭhi" gloss="view" onOpen={onOpen} />)

    await user.click(screen.getByRole('button'))

    expect(onOpen).toHaveBeenCalledWith('diṭṭhi')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<GlossChip pali="diṭṭhi" gloss="view" onOpen={() => {}} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
