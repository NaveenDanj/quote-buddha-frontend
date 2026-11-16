import type { Meta, StoryObj } from '@storybook/react-vite'
import { FootnoteMarker } from './FootnoteMarker'

const meta = {
  title: 'Components/Molecules/FootnoteMarker',
  component: FootnoteMarker,
  tags: ['autodocs'],
  args: { number: 1, onOpen: () => {} },
} satisfies Meta<typeof FootnoteMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InsideText: Story = {
  render: (args) => (
    <p className="max-w-(--measure-reading) font-reading text-reading">
      Sample sentence with a source marker at the end.
      <FootnoteMarker {...args} />
    </p>
  ),
}

export const TwoDigits: Story = { args: { number: 12 } }
