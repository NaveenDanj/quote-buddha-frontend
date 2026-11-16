import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '@ds/atoms/Icon'
import { IconButton } from './IconButton'

const meta = {
  title: 'Design System/Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: 'copy', label: 'Copy answer', size: 'medium' },
  argTypes: {
    icon: { control: 'select', options: iconNames },
    size: { control: 'inline-radio', options: ['small', 'medium'] },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = { args: { size: 'small' } }

export const Pressed: Story = {
  args: { icon: 'evidenceMatrix', label: 'Evidence matrix', isPressed: true },
}

export const Solid: Story = { args: { icon: 'send', label: 'Send', isSolid: true } }

export const Disabled: Story = { args: { disabled: true } }
