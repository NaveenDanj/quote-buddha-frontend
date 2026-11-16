import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Mark } from './Mark'

describe('Mark', () => {
  it('keeps the marked words in the text', () => {
    render(
      <p>
        One word, <Mark>craving</Mark>, is marked.
      </p>,
    )
    expect(screen.getByText('craving').tagName).toBe('MARK')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <p>
        One word, <Mark>craving</Mark>, is marked.
      </p>,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
