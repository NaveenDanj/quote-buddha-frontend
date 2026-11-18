import type { Meta, StoryObj } from '@storybook/react-vite'
import { DropZone } from './DropZone'

const meta = {
  title: 'Design System/Atoms/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  args: {
    title: 'Drop a file here or choose one',
    hint: 'PDF or Word, up to 10 MB',
    accept: '.pdf,.docx',
    onFilesChosen: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-dialog-small)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropZone>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Several: Story = {
  args: { isMultiple: true, title: 'Drop files here or choose them' },
}

export const Disabled: Story = { args: { disabled: true } }

export const WithNote: Story = { args: { note: 'Chosen: essay.pdf' } }
