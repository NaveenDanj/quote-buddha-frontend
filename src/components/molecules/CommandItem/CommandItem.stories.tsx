import type { Meta, StoryObj } from '@storybook/react-vite'
import { CommandItem } from './CommandItem'

const meta = {
  title: 'Components/Molecules/CommandItem',
  component: CommandItem,
  tags: ['autodocs'],
  args: {
    id: 'command-sample',
    label: 'Open the Reader',
    isHighlighted: false,
    onSelect: () => {},
  },
  decorators: [
    (Story) => (
      <ul
        role="listbox"
        aria-label="Commands"
        className="m-0 max-w-(--layout-dialog-palette) list-none border-t border-border p-0"
      >
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof CommandItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Highlighted: Story = { args: { isHighlighted: true } }

export const WithShortcut: Story = { args: { shortcut: 'Ctrl K' } }
