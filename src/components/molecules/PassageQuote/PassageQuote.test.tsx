import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { TextLanguage } from '@domain'
import { PassageQuote } from './PassageQuote'

describe('PassageQuote', () => {
  it('shows the quote as a quotation', () => {
    render(<PassageQuote quote="Sample quotation" language={TextLanguage.english} />)
    expect(screen.getByText('Sample quotation').tagName).toBe('BLOCKQUOTE')
  })

  it('shows where it comes from, under the quote', () => {
    render(
      <PassageQuote
        quote="Sample quotation"
        language={TextLanguage.english}
        source={<span>Sample citation</span>}
      />,
    )
    expect(screen.getByRole('figure')).toHaveTextContent('Sample citation')
  })

  it('has no caption when there is no source', () => {
    const { container } = render(
      <PassageQuote quote="Sample quotation" language={TextLanguage.english} />,
    )
    expect(container.querySelector('figcaption')).not.toBeInTheDocument()
  })

  it('marks the language of the quote', () => {
    render(<PassageQuote quote="Sample Pali quotation" language={TextLanguage.pali} />)
    expect(screen.getByText('Sample Pali quotation')).toHaveAttribute('lang', 'pi')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <PassageQuote
        quote="Sample quotation"
        language={TextLanguage.english}
        source={<span>Sample citation</span>}
      />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
