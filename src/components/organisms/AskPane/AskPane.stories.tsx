import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PassageQuestion } from '@domain'
import { AskPane } from './AskPane'

const answeredTurn: PassageQuestion = {
  id: '1',
  question: 'What does this passage mean?',
  paragraphId: '1.1',
  answer: {
    text: 'Layout sample: an answer about the passage.',
    citationId: 'pitaka_lk:dn-1:1:1',
    citationLabel: 'DN 1 · 1.1',
  },
}

const meta = {
  title: 'Components/Organisms/AskPane',
  component: AskPane,
  tags: ['autodocs'],
  args: {
    turns: [],
    onChooseSuggestion: () => {},
    onSaveAsNote: () => {},
    onOpenPassage: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-reader-side)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AskPane>

export default meta
type Story = StoryObj<typeof meta>

export const Suggestions: Story = {}

export const Answered: Story = { args: { turns: [answeredTurn] } }

export const WaitingForAnswer: Story = {
  args: {
    turns: [answeredTurn, { id: '2', question: 'Which terms matter here?', paragraphId: '1.1' }],
  },
}
