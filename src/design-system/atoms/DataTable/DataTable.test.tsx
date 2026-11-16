import { render, screen, within } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { describe, expect, it } from 'vitest'
import { DataTable } from './DataTable'

const sampleColumns = [
  { key: 'claim', header: 'Claim' },
  { key: 'state', header: 'State' },
]

const sampleRows = [
  { id: '1', cells: { claim: 'Sample claim one', state: 'Direct quote' } },
  { id: '2', cells: { claim: 'Sample claim two', state: 'Not verified' } },
]

describe('DataTable', () => {
  it('is a table with a name and column headers', () => {
    render(
      <DataTable caption="Evidence for each claim" columns={sampleColumns} rows={sampleRows} />,
    )
    expect(screen.getByRole('table', { name: 'Evidence for each claim' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Claim' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'State' })).toBeInTheDocument()
  })

  it('puts each cell under its column', () => {
    render(<DataTable caption="Evidence" columns={sampleColumns} rows={sampleRows} />)
    const secondRow = screen.getAllByRole('row')[2]
    if (!secondRow) {
      throw new Error('The second data row is missing')
    }
    expect(
      within(secondRow)
        .getAllByRole('cell')
        .map((cell) => cell.textContent),
    ).toEqual(['Sample claim two', 'Not verified'])
  })

  it('names each row when a row header column is given', () => {
    render(
      <DataTable
        caption="Evidence"
        columns={sampleColumns}
        rows={sampleRows}
        rowHeaderKey="claim"
      />,
    )
    expect(screen.getByRole('rowheader', { name: 'Sample claim one' })).toBeInTheDocument()
    expect(screen.getByRole('rowheader', { name: 'Sample claim two' })).toBeInTheDocument()
  })

  it('has a scroll area that the keyboard can reach', () => {
    render(<DataTable caption="Evidence" columns={sampleColumns} rows={sampleRows} />)
    expect(screen.getByRole('region', { name: 'Evidence' })).toHaveAttribute('tabindex', '0')
  })

  it('shows only the headers when there are no rows', () => {
    render(<DataTable caption="Evidence" columns={sampleColumns} rows={[]} />)
    expect(screen.getAllByRole('row')).toHaveLength(1)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <DataTable caption="Evidence" columns={sampleColumns} rows={sampleRows} />,
    )
    expect(await axe(container)).toHaveNoViolations()
  })
})
