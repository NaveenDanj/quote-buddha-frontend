import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { FactList } from './FactList'

const sampleFacts = [
  { label: 'Edition', value: 'Sample edition' },
  { label: 'Translator', value: 'Not recorded in source' },
]

describe('FactList', () => {
  it('shows each label with its value', () => {
    render(<FactList facts={sampleFacts} />)
    expect(screen.getByText('Edition').tagName).toBe('DT')
    expect(screen.getByText('Sample edition').tagName).toBe('DD')
    expect(screen.getByText('Not recorded in source')).toBeInTheDocument()
  })

  it('keeps the order it was given', () => {
    render(<FactList facts={sampleFacts} />)
    const labels = screen.getAllByRole('term').map((term) => term.textContent)
    expect(labels).toEqual(['Edition', 'Translator'])
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<FactList facts={sampleFacts} />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
