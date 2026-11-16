import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Link } from '@ds/atoms/Link'
import { HoverCard } from './HoverCard'

function renderHoverCard() {
  render(
    <HoverCard trigger={<Link href="#term">sample term</Link>}>
      <p>Sample preview text</p>
    </HoverCard>,
  )
}

// axe's "content must be in a landmark" rule is about whole pages, so it is off for a single component.
const componentCheckOptions = { rules: { region: { enabled: false } } }

describe('HoverCard', () => {
  it('is closed until the trigger is hovered or focused', () => {
    renderHoverCard()
    expect(screen.queryByText('Sample preview text')).not.toBeInTheDocument()
  })

  it('opens when the trigger gets keyboard focus', async () => {
    const user = userEvent.setup()
    renderHoverCard()

    await user.tab()

    expect(await screen.findByText('Sample preview text')).toBeInTheDocument()
  })

  it('opens when the trigger is hovered', async () => {
    const user = userEvent.setup()
    renderHoverCard()

    await user.hover(screen.getByRole('link', { name: 'sample term' }))

    expect(await screen.findByText('Sample preview text')).toBeInTheDocument()
  })

  it('closes with Escape', async () => {
    const user = userEvent.setup()
    renderHoverCard()
    await user.tab()
    await screen.findByText('Sample preview text')

    await user.keyboard('{Escape}')

    expect(screen.queryByText('Sample preview text')).not.toBeInTheDocument()
  })

  it('keeps the trigger a normal link', () => {
    renderHoverCard()
    expect(screen.getByRole('link', { name: 'sample term' })).toHaveAttribute('href', '#term')
  })

  it('has no accessibility violations', async () => {
    const user = userEvent.setup()
    renderHoverCard()
    await user.tab()
    await screen.findByText('Sample preview text')
    expect(await axe(document.body, componentCheckOptions)).toHaveNoViolations()
  })
})
