import type { Meta, StoryObj } from '@storybook/react-vite'
import { CompareActions } from './CompareActions'

const meta = {
  title: 'Components/Organisms/CompareActions',
  component: CompareActions,
  tags: ['autodocs'],
  args: { onAddToNotebook: () => {}, onAskAboutDifference: () => {} },
} satisfies Meta<typeof CompareActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
