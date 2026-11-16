import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '@ds/atoms/Icon'
import { Button } from './Button'

const meta = {
  title: 'Design System/Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Send report', variant: 'primary', size: 'medium' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'text'] },
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    leadingIcon: { control: 'select', options: [undefined, ...iconNames] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = { args: { variant: 'secondary', children: 'Check quotes' } }

export const Text: Story = { args: { variant: 'text', children: 'Show all sources' } }

export const Small: Story = { args: { size: 'small', variant: 'secondary', children: 'Cancel' } }

export const WithIcon: Story = { args: { leadingIcon: 'add', children: 'New chat' } }

export const Disabled: Story = { args: { disabled: true } }
