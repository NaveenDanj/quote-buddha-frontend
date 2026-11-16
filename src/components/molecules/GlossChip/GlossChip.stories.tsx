import type { Meta, StoryObj } from '@storybook/react-vite'
import { GlossChip } from './GlossChip'

const meta = {
  title: 'Components/Molecules/GlossChip',
  component: GlossChip,
  tags: ['autodocs'],
  args: { pali: 'diṭṭhi', gloss: 'view', onOpen: () => {} },
} satisfies Meta<typeof GlossChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <GlossChip pali="diṭṭhi" gloss="view" onOpen={() => {}} />
      <GlossChip pali="taṇhā" gloss="craving" onOpen={() => {}} />
    </div>
  ),
}
