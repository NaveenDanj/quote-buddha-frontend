import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { NoteCard } from './NoteCard'

const meta = {
  title: 'Components/Molecules/NoteCard',
  component: NoteCard,
  tags: ['autodocs'],
  args: {
    passageLabel: 'Sample passage 5.2',
    citationId: 'sample:citation:5.2',
    onOpenPassage: () => {},
    text: `${wording.sampleMarker}: a note the person wrote.`,
    actionsLabel: 'Note actions',
  },
} satisfies Meta<typeof NoteCard>

export default meta
type Story = StoryObj<typeof meta>

export const YourOwnNote: Story = {}

export const WithActions: Story = {
  args: {
    actions: [
      { icon: 'edit', label: 'Edit note', onSelect: () => {} },
      { icon: 'delete', label: 'Delete note', onSelect: () => {} },
    ],
  },
}

export const AiEnhanced: Story = {
  args: {
    isAiEnhanced: true,
    text: `${wording.sampleMarker}: a clearer version of the note, rewritten by the system.`,
    originalText: `${wording.sampleMarker}: what the person originally wrote.`,
  },
}

export const LongTextWraps: Story = {
  args: { text: `${wording.sampleMarker}: a long note. `.repeat(20) },
}
