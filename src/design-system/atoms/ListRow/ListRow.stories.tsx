import type { Meta, StoryObj } from '@storybook/react-vite'
import { CountBadge } from '@ds/atoms/CountBadge'
import { ListRow } from './ListRow'

// A row is a link or a button, so these stories write out their props instead of using shared args.
const meta = {
  title: 'Design System/Atoms/ListRow',
  component: ListRow,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="m-0 max-w-(--layout-rail) list-none border-t border-border p-0">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ListRow>

export default meta
type Story = StoryObj

export const AsButton: Story = {
  render: () => <ListRow onClick={() => {}}>Sample chat title</ListRow>,
}

export const AsLink: Story = {
  render: () => <ListRow href="#chat">Sample link row</ListRow>,
}

export const Selected: Story = {
  render: () => (
    <ListRow onClick={() => {}} isSelected>
      Selected chat title
    </ListRow>
  ),
}

export const WithTrailingCount: Story = {
  render: () => (
    <ListRow onClick={() => {}} trailing={<CountBadge count={4} label="notes" />}>
      Row with a count
    </ListRow>
  ),
}

export const LongTitleWraps: Story = {
  render: () => (
    <ListRow onClick={() => {}}>
      A very long sample chat title that goes on and on until it has to wrap onto another line
    </ListRow>
  ),
}
