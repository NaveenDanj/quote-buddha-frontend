import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { LiveDot } from './LiveDot'

describe('LiveDot', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<LiveDot />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <p>
        Answer text
        <LiveDot />
      </p>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
