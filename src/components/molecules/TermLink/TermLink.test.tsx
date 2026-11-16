import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it, vi } from 'vitest'
import { TermLink } from './TermLink'

describe('TermLink', () => {
  it('is a real link, so touch users can reach the term', () => {
    render(
      <TermLink pali="diṭṭhi" gloss="view" href="/terms/ditthi">
        views
      </TermLink>,
    )
    expect(screen.getByRole('link', { name: 'views' })).toHaveAttribute('href', '/terms/ditthi')
  })

  it('shows the Pali word and its gloss when it gets keyboard focus', async () => {
    const user = userEvent.setup()
    render(
      <TermLink pali="diṭṭhi" gloss="view" href="/terms/ditthi">
        views
      </TermLink>,
    )

    await user.tab()

    const pali = await screen.findByText('diṭṭhi')
    expect(pali).toHaveAttribute('lang', 'pi')
    expect(screen.getByText(': view')).toBeInTheDocument()
  })

  it('opens the term in place when it is given onOpen', async () => {
    const onOpen = vi.fn()
    const user = userEvent.setup()
    render(
      <TermLink pali="diṭṭhi" gloss="view" href="/terms/ditthi" onOpen={onOpen}>
        views
      </TermLink>,
    )

    await user.click(screen.getByRole('link'))

    expect(onOpen).toHaveBeenCalledWith('diṭṭhi')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <p>
        Sample sentence about wrong{' '}
        <TermLink pali="diṭṭhi" gloss="view" href="/terms/ditthi">
          views
        </TermLink>
        .
      </p>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
