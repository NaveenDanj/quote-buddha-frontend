import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldButton } from './FieldButton'

const meta = {
  title: 'Design System/Atoms/FieldButton',
  component: FieldButton,
  tags: ['autodocs'],
  args: { children: 'Search chats and texts', onClick: () => {} },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FieldButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
