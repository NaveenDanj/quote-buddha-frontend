import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta = {
  title: 'Design System/Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Search the texts', placeholder: 'For example: craving' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-dialog-small)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithHint: Story = {
  args: { hint: 'Pali words work too, with or without diacritics.' },
}

export const WithError: Story = {
  args: { errorText: 'Enter at least two letters.', defaultValue: 'a' },
}

export const Disabled: Story = { args: { disabled: true } }

export const LabelHidden: Story = { args: { isLabelHidden: true } }
