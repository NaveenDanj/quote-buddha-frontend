import type { Meta, StoryObj } from '@storybook/react-vite'
import { Mark } from './Mark'

const meta = {
  title: 'Design System/Atoms/Mark',
  component: Mark,
  tags: ['autodocs'],
  args: { children: 'craving' },
} satisfies Meta<typeof Mark>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InsideText: Story = {
  render: (args) => (
    <p className="max-w-(--measure-reading) font-reading text-reading">
      Sample sentence where one word, <Mark {...args} />, is marked.
    </p>
  ),
}
