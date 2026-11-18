import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { NotebookAside } from './NotebookAside'

const meta = {
  title: 'Components/Organisms/NotebookAside',
  component: NotebookAside,
  tags: ['autodocs'],
  args: {
    chats: [
      { id: '1', title: `${wording.sampleMarker}: a chat about the self` },
      { id: '2', title: `${wording.sampleMarker}: a chat about wrong views` },
    ],
    onOpenChat: () => {},
    sources: [
      { citationId: 'pitaka_lk:dn-1:1:1', label: 'DN 1 · 1.1', useCount: 3 },
      { citationId: 'pitaka_lk:dn-1:1:2', label: 'DN 1 · 1.2', useCount: 1 },
    ],
    onOpenSource: () => {},
  },
  decorators: [
    (Story) => (
      <div className="grid max-w-(--layout-reader-side) gap-page">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotebookAside>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { chats: [], sources: [] } }
