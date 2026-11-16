import type { Meta, StoryObj } from '@storybook/react-vite'
import { DataTable } from './DataTable'

const sampleColumns = [
  { key: 'claim', header: 'Claim' },
  { key: 'source', header: 'Source' },
  { key: 'state', header: 'State' },
]

const sampleRows = [
  {
    id: '1',
    cells: { claim: 'Sample claim one', source: 'Sample source A', state: 'Direct quote' },
  },
  {
    id: '2',
    cells: { claim: 'Sample claim two', source: 'Sample source B', state: 'Not verified' },
  },
  {
    id: '3',
    cells: { claim: 'Sample claim three', source: 'Sample source C', state: 'Not established' },
  },
]

const meta = {
  title: 'Design System/Atoms/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  args: { caption: 'Evidence for each claim', columns: sampleColumns, rows: sampleRows },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoRows: Story = { args: { rows: [] } }

export const AtPhoneWidth: Story = {
  parameters: { viewport: { defaultViewport: 'phone' } },
}
