import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '../Icon'
import { Chip } from './Chip'

const meta = {
  title: 'Design System/Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Deep answer' },
  argTypes: {
    icon: { control: 'select', options: [undefined, ...iconNames] },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pressed: Story = { args: { isPressed: true } }

export const WithIcon: Story = { args: { icon: 'attach', children: 'Attach file' } }

export const Disabled: Story = { args: { disabled: true, children: 'Not in the corpus yet' } }

export const Row: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip isPressed>Quick</Chip>
      <Chip>Deep</Chip>
      <Chip disabled>MN 1</Chip>
    </div>
  ),
}
