import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskBar } from './AskBar'

const meta = {
  title: 'Components/Organisms/AskBar',
  component: AskBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { contextLabel: 'On 1.1', value: '', onValueChange: () => {}, onSubmit: () => {} },
} satisfies Meta<typeof AskBar>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithQuestion: Story = { args: { value: 'What does this passage mean?' } }

export const OnSelectedWords: Story = {
  args: { contextLabel: 'On 1.1 · “Layout sample: selected words”' },
}
