import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileChip } from './FileChip'

const meta = {
  title: 'Components/Molecules/FileChip',
  component: FileChip,
  tags: ['autodocs'],
  args: { fileName: 'sample-file.pdf', removeLabel: 'Remove sample-file.pdf', onRemove: () => {} },
} satisfies Meta<typeof FileChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongNameIsCut: Story = {
  args: { fileName: 'a-very-long-sample-file-name-that-does-not-fit-in-the-space-it-is-given.pdf' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
}
