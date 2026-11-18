import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { NotebookNoteEditor } from './NotebookNoteEditor'

const meta = {
  title: 'Components/Organisms/NotebookNoteEditor',
  component: NotebookNoteEditor,
  tags: ['autodocs'],
  args: { value: '', onValueChange: () => {}, onSave: () => {} },
} satisfies Meta<typeof NotebookNoteEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Writing: Story = { args: { value: `${wording.sampleMarker}: a note being written.` } }
