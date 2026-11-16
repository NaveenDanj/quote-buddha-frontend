import type { Meta, StoryObj } from '@storybook/react-vite'
import { CiteLink } from './CiteLink'

const meta = {
  title: 'Components/Molecules/CiteLink',
  component: CiteLink,
  tags: ['autodocs'],
  args: { citationId: 'sample:citation:1', label: 'Sample citation', onOpen: () => {} },
} satisfies Meta<typeof CiteLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InsideText: Story = {
  render: (args) => (
    <p className="max-w-(--measure-reading) font-reading text-reading">
      Sample sentence that points to <CiteLink {...args} /> in the middle of the text.
    </p>
  ),
}
