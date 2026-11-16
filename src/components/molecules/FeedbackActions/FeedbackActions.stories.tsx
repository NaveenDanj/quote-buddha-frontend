import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FeedbackChoice } from '@domain'
import { FeedbackActions } from './FeedbackActions'

const meta = {
  title: 'Components/Molecules/FeedbackActions',
  component: FeedbackActions,
  tags: ['autodocs'],
  args: { onChoose: () => {} },
} satisfies Meta<typeof FeedbackActions>

export default meta
type Story = StoryObj<typeof meta>

export const NoChoiceYet: Story = {}

export const Helpful: Story = { args: { choice: FeedbackChoice.helpful } }

export const NotHelpful: Story = { args: { choice: FeedbackChoice.notHelpful } }

function ChoosingExample() {
  const [choice, setChoice] = useState<FeedbackChoice | undefined>(undefined)
  return <FeedbackActions choice={choice} onChoose={setChoice} />
}

export const Interactive: Story = { render: () => <ChoosingExample /> }
