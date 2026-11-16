import type { Meta, StoryObj } from '@storybook/react-vite'
import { LiveDot } from './LiveDot'

const meta = {
  title: 'Design System/Atoms/LiveDot',
  component: LiveDot,
  tags: ['autodocs'],
} satisfies Meta<typeof LiveDot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AfterStreamingText: Story = {
  render: () => (
    <p className="font-reading text-reading">
      Sample answer text that is still arriving
      <span className="ml-2">
        <LiveDot />
      </span>
    </p>
  ),
}
