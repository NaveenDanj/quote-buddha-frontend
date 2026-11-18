import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { NotebookNoteCard } from './NotebookNoteCard'

const meta = {
  title: 'Components/Organisms/NotebookNoteCard',
  component: NotebookNoteCard,
  tags: ['autodocs'],
  args: {
    onOpenPassage: () => {},
    entry: {
      id: '1',
      createdAtInMilliseconds: Date.UTC(2026, 10, 16),
      text: `${wording.sampleMarker}: a note the person wrote.`,
      isAiEnhanced: false,
      passage: {
        citationId: 'pitaka_lk:dn-1:1:1',
        label: 'DN 1 · 1.1',
        quote: `${wording.sampleMarker}: a passage embedded in a note.`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-dialog-graph)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotebookNoteCard>

export default meta
type Story = StoryObj<typeof meta>

export const AboutAPassage: Story = {}

export const WithoutAPassage: Story = {
  args: {
    entry: {
      id: '2',
      createdAtInMilliseconds: Date.UTC(2026, 10, 17),
      text: `${wording.sampleMarker}: a note about nothing in particular.`,
      isAiEnhanced: false,
    },
  },
}

export const AiEnhanced: Story = {
  args: {
    entry: {
      id: '3',
      createdAtInMilliseconds: Date.UTC(2026, 10, 18),
      text: `${wording.sampleMarker}: a note the system rewrote.`,
      isAiEnhanced: true,
      originalText: `${wording.sampleMarker}: what the person wrote first.`,
      passage: { citationId: 'pitaka_lk:dn-1:1:2', label: 'DN 1 · 1.2' },
    },
  },
}
