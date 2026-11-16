import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { ActionBar } from './ActionBar'

const meta = {
  title: 'Components/Molecules/ActionBar',
  component: ActionBar,
  tags: ['autodocs'],
  args: {
    label: wording.answerActionsLabel,
    actions: [
      { icon: 'copy', label: wording.copyAnswerLabel, onSelect: () => {} },
      { icon: 'regenerate', label: wording.askAgainLabel, onSelect: () => {} },
      { icon: 'saveToNotebook', label: wording.saveToNotebookLabel, onSelect: () => {} },
      { icon: 'share', label: wording.shareLabel, onSelect: () => {} },
    ],
  },
} satisfies Meta<typeof ActionBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSavedPressed: Story = {
  args: {
    actions: [
      { icon: 'copy', label: wording.copyAnswerLabel, onSelect: () => {} },
      {
        icon: 'saveToNotebook',
        label: wording.saveToNotebookLabel,
        onSelect: () => {},
        isPressed: true,
      },
    ],
  },
}
