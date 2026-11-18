import type { Meta, StoryObj } from '@storybook/react-vite'
import { OccurrenceBars } from './OccurrenceBars'

const meta = {
  title: 'Components/Molecules/OccurrenceBars',
  component: OccurrenceBars,
  tags: ['autodocs'],
  args: {
    occurrences: [
      { label: 'DN 1', count: 62 },
      { label: 'Others', count: 0 },
    ],
  },
} satisfies Meta<typeof OccurrenceBars>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SeveralTexts: Story = {
  args: {
    occurrences: [
      { label: 'DN 1', count: 62 },
      { label: 'DN 2', count: 31 },
      { label: 'Others', count: 4 },
    ],
  },
}
