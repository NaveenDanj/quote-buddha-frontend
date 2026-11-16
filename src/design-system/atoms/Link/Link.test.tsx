import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { Link } from './Link'

describe('Link', () => {
  it('is a link with its address', () => {
    render(<Link href="/texts/dn1">Read the full passage</Link>)
    expect(screen.getByRole('link', { name: 'Read the full passage' })).toHaveAttribute(
      'href',
      '/texts/dn1',
    )
  })

  it('passes other attributes through', () => {
    render(
      <Link href="https://example.org" target="_blank" rel="noreferrer">
        Outside
      </Link>,
    )
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Link href="#top">Back to top</Link>)
    expect(await axe(container)).toHaveNoViolations()
  })
})
