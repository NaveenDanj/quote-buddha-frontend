import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta = {
  title: 'Design System/Atoms/Link',
  component: Link,
  tags: ['autodocs'],
  args: { href: '#', children: 'Read the full passage' },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InsideText: Story = {
  render: (args) => (
    <p className="max-w-(--measure-reading) font-reading text-reading">
      Sample sentence with a <Link {...args}>link in the middle</Link> of the text.
    </p>
  ),
}
