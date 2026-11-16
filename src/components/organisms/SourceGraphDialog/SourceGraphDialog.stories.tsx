import type { Meta, StoryObj } from '@storybook/react-vite'
import { abstainedWeakEvidenceAnswer, answeredQuickAnswer } from '@api/fixtures'
import { SourceGraphDialog } from './SourceGraphDialog'

const meta = {
  title: 'Components/Organisms/SourceGraphDialog',
  component: SourceGraphDialog,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { answer: answeredQuickAnswer, isOpen: true, onOpenChange: () => {} },
} satisfies Meta<typeof SourceGraphDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Answered: Story = {}

export const WithOpenInReader: Story = { args: { onOpenInReader: () => {} } }

export const NothingFound: Story = { args: { answer: abstainedWeakEvidenceAnswer } }
