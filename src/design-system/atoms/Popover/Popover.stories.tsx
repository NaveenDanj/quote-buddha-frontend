import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '@ds/atoms/IconButton'
import { Popover } from './Popover'

const meta = {
  title: 'Design System/Atoms/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    trigger: <IconButton icon="settings" label="Reading settings" />,
    label: 'Reading settings',
    children: <p>Sample panel content.</p>,
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongContentWraps: Story = {
  args: {
    children: (
      <p>
        A long sample sentence that has to wrap inside the panel instead of stretching it wider than
        the panel width allows.
      </p>
    ),
  },
}
