import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { EvidenceState, evidenceStates } from '@domain'
import { evidenceStateText } from '@wording'
import { Legend } from './Legend'

describe('Legend', () => {
  it('is a named list with one entry for each state it is given', () => {
    render(
      <Legend label="Evidence key" states={[EvidenceState.directQuote, EvidenceState.removed]} />,
    )
    const list = screen.getByRole('list', { name: 'Evidence key' })
    expect(list.querySelectorAll('li')).toHaveLength(2)
  })

  it('says every state in words next to its shape', () => {
    render(<Legend label="Evidence key" states={evidenceStates} />)
    for (const state of evidenceStates) {
      expect(screen.getByText(evidenceStateText[state])).toBeInTheDocument()
    }
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<Legend label="Evidence key" states={evidenceStates} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
