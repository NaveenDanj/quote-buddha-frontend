import type { Meta, StoryObj } from '@storybook/react-vite'
import { PassageContext } from './PassageContext'

const meta = {
  title: 'Components/Molecules/PassageContext',
  component: PassageContext,
  tags: ['autodocs'],
  args: { label: 'On 1.1' },
} satisfies Meta<typeof PassageContext>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSelectedWords: Story = {
  args: { label: 'On 1.1 · “Layout sample: words the reader selected in the paragraph”' },
}
