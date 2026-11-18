import type { Meta, StoryObj } from '@storybook/react-vite'
import { NoteScope, type ReaderNote } from '@domain'
import { wording } from '@wording'
import { NotesPane } from './NotesPane'

const ownNote: ReaderNote = {
  id: '1',
  createdAtInMilliseconds: 0,
  suttaId: 'dn-1',
  sectionIndex: 0,
  paragraphId: '1.1',
  citationId: 'pitaka_lk:dn-1:1:1',
  text: `${wording.sampleMarker}: a note the person wrote.`,
  isAiEnhanced: false,
}

const enhancedNote: ReaderNote = {
  ...ownNote,
  id: '2',
  paragraphId: '1.2',
  citationId: 'pitaka_lk:dn-1:1:2',
  text: `${wording.sampleMarker}: a note the system rewrote.`,
  isAiEnhanced: true,
  originalText: `${wording.sampleMarker}: what the person wrote first.`,
}

const meta = {
  title: 'Components/Organisms/NotesPane',
  component: NotesPane,
  tags: ['autodocs'],
  args: {
    contextLabel: 'On 1.1',
    scope: NoteScope.section,
    onScopeChange: () => {},
    workRef: 'DN 1',
    notes: [ownNote, enhancedNote],
    onOpenPassage: () => {},
    draft: '',
    onDraftChange: () => {},
    canSave: false,
    onSave: () => {},
    canEnhance: false,
    isEnhancing: false,
    onEnhance: () => {},
    onUseSuggestion: () => {},
    onDiscardSuggestion: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-reader-side)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotesPane>

export default meta
type Story = StoryObj<typeof meta>

export const WithNotes: Story = {}

export const NoNotesYet: Story = { args: { notes: [] } }

export const Writing: Story = {
  args: { draft: `${wording.sampleMarker}: a draft note.`, canSave: true, canEnhance: true },
}

export const WithSuggestion: Story = {
  args: {
    draft: 'sets the scene?',
    canSave: true,
    canEnhance: true,
    suggestion: `${wording.sampleMarker}: this paragraph sets the scene.`,
  },
}

export const Enhancing: Story = {
  args: { draft: 'sets the scene?', canSave: true, canEnhance: true, isEnhancing: true },
}
