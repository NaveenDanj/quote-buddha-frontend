import type { Meta, StoryObj } from '@storybook/react-vite'
import { TermLink } from './TermLink'

const meta = {
  title: 'Components/Molecules/TermLink',
  component: TermLink,
  tags: ['autodocs'],
  args: { pali: 'diṭṭhi', gloss: 'view', href: '#term', children: 'views' },
} satisfies Meta<typeof TermLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InsideText: Story = {
  render: (args) => (
    <p className="max-w-(--measure-reading) font-reading text-reading">
      Sample sentence about wrong <TermLink {...args} /> in the middle of the text.
    </p>
  ),
}
