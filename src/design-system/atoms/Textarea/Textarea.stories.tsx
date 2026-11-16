import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta = {
  title: 'Design System/Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { label: 'Your note', placeholder: 'Write a note about this passage' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-dialog-small)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = { args: { hint: 'Notes are private to you.' } }

export const WithError: Story = { args: { errorText: 'A note cannot be empty.' } }

export const Disabled: Story = { args: { disabled: true } }

export const LabelHidden: Story = { args: { isLabelHidden: true, rows: 2 } }
