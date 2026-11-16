import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { wording } from '@wording'
import { SystemExplanation } from './SystemExplanation'

function renderSimpleAnswer() {
  return render(
    <SystemExplanation heading={wording.simpleAnswerHeading} label={wording.simpleAnswerLabel}>
      Sample summary
    </SystemExplanation>,
  )
}

describe('SystemExplanation', () => {
  it('is a region named by its heading, with its text', () => {
    renderSimpleAnswer()
    expect(screen.getByRole('region', { name: wording.simpleAnswerHeading })).toHaveTextContent(
      'Sample summary',
    )
  })

  it('shows the label it is given, so the system text is never unlabelled', () => {
    renderSimpleAnswer()
    expect(screen.getByText(wording.simpleAnswerLabel)).toBeInTheDocument()
  })

  it('can carry the shorter system label for other system text', () => {
    render(
      <SystemExplanation heading="Clarification" label={wording.systemLabel}>
        Sample clarification
      </SystemExplanation>,
    )
    expect(screen.getByText(wording.systemLabel)).toBeInTheDocument()
  })

  it('does not look like a quotation', () => {
    const { container } = renderSimpleAnswer()
    expect(container.querySelector('blockquote')).not.toBeInTheDocument()
    expect(container.querySelector('figure')).not.toBeInTheDocument()
  })

  it('lets the page choose the heading level', () => {
    render(
      <SystemExplanation heading="Simple answer" headingElement="h2" label={wording.systemLabel}>
        Sample summary
      </SystemExplanation>,
    )
    expect(screen.getByRole('heading', { level: 2, name: 'Simple answer' })).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = renderSimpleAnswer()
    expect(await axe(container)).toHaveNoViolations()
  })
})
