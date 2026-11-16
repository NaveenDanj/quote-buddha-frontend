import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChatRow } from './ChatRow'

const chatMenuItems = [
  { label: 'Rename', icon: 'edit', onSelect: () => {} },
  { label: 'Share', icon: 'share', onSelect: () => {} },
  { label: 'Delete', icon: 'delete', onSelect: () => {} },
] as const

const meta = {
  title: 'Components/Molecules/ChatRow',
  component: ChatRow,
  tags: ['autodocs'],
  args: {
    title: 'Sample chat title',
    onOpen: () => {},
    menuLabel: 'Chat options',
    menuItems: [...chatMenuItems],
  },
  decorators: [
    (Story) => (
      <ul className="m-0 max-w-(--layout-rail) list-none border-t border-border p-0">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof ChatRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Selected: Story = { args: { isSelected: true } }

export const LongTitleIsCut: Story = {
  args: { title: 'A very long sample chat title that goes on and on until it has to be cut' },
}
