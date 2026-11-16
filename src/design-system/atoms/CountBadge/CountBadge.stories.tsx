import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '../IconButton'
import { CountBadge } from './CountBadge'

const meta = {
  title: 'Design System/Atoms/CountBadge',
  component: CountBadge,
  tags: ['autodocs'],
  args: { count: 3, label: 'notes' },
} satisfies Meta<typeof CountBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnAnIconButton: Story = {
  render: (args) => (
    <div className="relative inline-block">
      <IconButton icon="notes" label="Notes" />
      <CountBadge {...args} className="absolute -top-1 -right-1" />
    </div>
  ),
}
