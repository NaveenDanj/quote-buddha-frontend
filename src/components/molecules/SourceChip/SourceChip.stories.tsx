import type { Meta, StoryObj } from '@storybook/react-vite'
import { SourceChip } from './SourceChip'

const meta = {
  title: 'Components/Molecules/SourceChip',
  component: SourceChip,
  tags: ['autodocs'],
  args: { number: 1, label: 'Sample source', onOpen: () => {} },
} satisfies Meta<typeof SourceChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pressed: Story = { args: { isPressed: true } }

export const NotYetIncluded: Story = { args: { isIncluded: false } }

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SourceChip number={1} label="Sample source" onOpen={() => {}} />
      <SourceChip number={2} label="Another sample" onOpen={() => {}} isPressed />
      <SourceChip number={3} label="Planned sample" onOpen={() => {}} isIncluded={false} />
    </div>
  ),
}
