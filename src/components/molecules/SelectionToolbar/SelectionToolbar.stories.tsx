import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { SelectionToolbar } from './SelectionToolbar'

const meta = {
  title: 'Components/Molecules/SelectionToolbar',
  component: SelectionToolbar,
  tags: ['autodocs'],
  args: {
    label: wording.selectedTextLabel,
    actions: [
      { icon: 'notes', label: wording.addNoteLabel, onSelect: () => {} },
      { icon: 'terms', label: wording.clarifyLabel, onSelect: () => {} },
      { icon: 'ask', label: wording.askAboutThisLabel, onSelect: () => {} },
      { icon: 'cite', label: wording.copyCitationLabel, onSelect: () => {} },
    ],
  },
} satisfies Meta<typeof SelectionToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
