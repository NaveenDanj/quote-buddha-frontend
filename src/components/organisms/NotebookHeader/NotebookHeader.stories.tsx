import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { NotebookHeader } from './NotebookHeader'

const meta = {
  title: 'Components/Organisms/NotebookHeader',
  component: NotebookHeader,
  tags: ['autodocs'],
  args: {
    title: wording.sampleNotebookTitle,
    onExportMarkdown: () => {},
    onExportBibtex: () => {},
  },
} satisfies Meta<typeof NotebookHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
