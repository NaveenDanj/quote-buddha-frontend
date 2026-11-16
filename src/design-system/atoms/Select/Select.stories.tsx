import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const textSizes = [
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'extra-large', label: 'Extra large' },
]

const meta = {
  title: 'Design System/Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: { label: 'Reading size', options: textSizes },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-dialog-small)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithChoice: Story = { args: { defaultValue: 'medium' } }

export const WithHint: Story = { args: { hint: 'Applies to answers and the Reader.' } }

export const WithError: Story = { args: { errorText: 'Choose a reading size.' } }

export const Disabled: Story = { args: { disabled: true, defaultValue: 'medium' } }
