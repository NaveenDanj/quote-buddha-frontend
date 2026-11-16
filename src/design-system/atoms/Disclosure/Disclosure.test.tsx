import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Disclosure } from './Disclosure'

describe('Disclosure', () => {
  it('is closed to begin with', () => {
    render(<Disclosure summary="How was this answer made?">Sample explanation</Disclosure>)
    expect(screen.getByRole('group')).not.toHaveAttribute('open')
  })

  it('opens and closes from a click on the summary', async () => {
    const user = userEvent.setup()
    render(<Disclosure summary="How was this answer made?">Sample explanation</Disclosure>)
    const summary = screen.getByText('How was this answer made?')

    await user.click(summary)
    expect(screen.getByRole('group')).toHaveAttribute('open')

    await user.click(summary)
    expect(screen.getByRole('group')).not.toHaveAttribute('open')
  })

  it('can be reached with the Tab key', async () => {
    // Browsers open a focused summary on Enter and Space by themselves. jsdom does not, so this
    // test only proves that the summary can take keyboard focus.
    const user = userEvent.setup()
    render(<Disclosure summary="How was this answer made?">Sample explanation</Disclosure>)

    await user.tab()

    expect(screen.getByText('How was this answer made?')).toHaveFocus()
  })

  it('can start open', () => {
    render(
      <Disclosure summary="How was this answer made?" isOpenAtStart>
        Sample explanation
      </Disclosure>,
    )
    expect(screen.getByText('Sample explanation')).toBeVisible()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Disclosure summary="How was this answer made?">Sample explanation</Disclosure>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
