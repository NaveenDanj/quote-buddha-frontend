import type { Meta, StoryObj } from '@storybook/react-vite'
import { TermFinder } from './TermFinder'

const meta = {
  title: 'Components/Organisms/TermFinder',
  component: TermFinder,
  tags: ['autodocs'],
  args: {
    terms: [
      { id: 'ditthi', pali: 'diṭṭhi' },
      { id: 'atta', pali: 'attā' },
      { id: 'sassata', pali: 'sassata' },
    ],
    selectedTermId: 'ditthi',
    query: '',
    onQueryChange: () => {},
    onSelectTerm: () => {},
  },
  decorators: [
    (Story) => (
      <div className="grid max-w-(--layout-list-column) gap-group">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TermFinder>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NothingMatches: Story = { args: { terms: [], query: 'zzz' } }
