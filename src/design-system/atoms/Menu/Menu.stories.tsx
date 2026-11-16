import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconButton } from '@ds/atoms/IconButton'
import { Menu } from './Menu'

const chatMenuItems = [
  { label: 'Rename', icon: 'edit', onSelect: () => {} },
  { label: 'Share', icon: 'share', onSelect: () => {} },
  { label: 'Delete', icon: 'delete', onSelect: () => {} },
] as const

const meta = {
  title: 'Design System/Atoms/Menu',
  component: Menu,
  tags: ['autodocs'],
  args: {
    trigger: <IconButton icon="more" label="Chat options" size="small" />,
    items: [...chatMenuItems],
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutIcons: Story = {
  args: {
    items: [
      { label: 'Copy citation', onSelect: () => {} },
      { label: 'Report citation', onSelect: () => {} },
    ],
  },
}
