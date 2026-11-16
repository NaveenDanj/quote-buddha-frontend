import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { ContextChip } from './ContextChip'

const meta = {
  title: 'Components/Molecules/ContextChip',
  component: ContextChip,
  tags: ['autodocs'],
  args: {
    label: 'On sample section 5.2',
    removeLabel: wording.removeContextLabel,
    onRemove: () => {},
  },
} satisfies Meta<typeof ContextChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongLabelIsCut: Story = {
  args: { label: 'On a very long sample section title that does not fit in the space it is given' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
}
