import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './Divider'

const meta = {
  title: 'Design System/Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const BetweenParagraphs: Story = {
  render: () => (
    <div className="grid max-w-(--measure-reading) gap-4 font-reading text-reading">
      <p>Sample paragraph above the rule.</p>
      <Divider />
      <p>Sample paragraph below the rule.</p>
    </div>
  ),
}
