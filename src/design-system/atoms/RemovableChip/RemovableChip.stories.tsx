import type { Meta, StoryObj } from '@storybook/react-vite'
import { RemovableChip } from './RemovableChip'

const meta = {
  title: 'Design System/Atoms/RemovableChip',
  component: RemovableChip,
  tags: ['autodocs'],
  args: { label: 'sample-file.pdf', removeLabel: 'Remove sample-file.pdf', onRemove: () => {} },
} satisfies Meta<typeof RemovableChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = { args: { icon: 'attach' } }

export const Dashed: Story = { args: { isDashed: true } }

export const LongLabelIsCut: Story = {
  args: { label: 'a-very-long-sample-file-name-that-does-not-fit-in-the-space-it-is-given.pdf' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
}
