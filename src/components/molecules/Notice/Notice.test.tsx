import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { EvidenceState } from '@domain'
import { wording } from '@wording'
import { Notice } from './Notice'

describe('Notice', () => {
  it('is a region named by its title', () => {
    render(<Notice title={wording.abstentionText} />)
    expect(screen.getByRole('region', { name: wording.abstentionText })).toBeInTheDocument()
  })

  it('says "not established" in words by default', () => {
    render(<Notice title={wording.abstentionText} />)
    expect(screen.getByText(wording.notEstablishedTag)).toBeInTheDocument()
  })

  it('always carries the scope note when nothing is established', () => {
    render(<Notice title={wording.abstentionText} />)
    expect(screen.getByText(wording.abstentionScope)).toBeInTheDocument()
  })

  it('does not add the abstention scope note to other states', () => {
    render(<Notice state={EvidenceState.notYetIncluded} title="MN 1" />)
    expect(screen.getByText(wording.notYetIncludedTag)).toBeInTheDocument()
    expect(screen.queryByText(wording.abstentionScope)).not.toBeInTheDocument()
  })

  it('shows what follows, such as the next step', () => {
    render(
      <Notice title={wording.abstentionText}>
        <p>Sample next step</p>
      </Notice>,
    )
    expect(screen.getByText('Sample next step')).toBeInTheDocument()
  })

  it('lets the page choose the heading level', () => {
    render(<Notice title={wording.abstentionText} headingElement="h2" />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('uses the dashed outline and no error styling', () => {
    render(<Notice title={wording.abstentionText} />)
    const region = screen.getByRole('region')
    expect(region).toHaveClass('border-dashed')
    expect(region.outerHTML).not.toMatch(/\b(danger|red|error|alert)\b/i)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Notice title={wording.abstentionText} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
