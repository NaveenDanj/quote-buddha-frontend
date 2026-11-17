import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { ChatHistory } from './ChatHistory'

const sampleMenuItems = [
  { label: 'Rename', icon: 'edit', onSelect: () => {} },
  { label: 'Delete', icon: 'delete', onSelect: () => {} },
] as const

const meta = {
  title: 'Components/Organisms/ChatHistory',
  component: ChatHistory,
  tags: ['autodocs'],
  args: {
    groups: [
      {
        id: 'today',
        label: wording.todayLabel,
        chats: [
          { id: '1', title: `${wording.sampleMarker}: a chat from today` },
          { id: '2', title: `${wording.sampleMarker}: another chat from today` },
        ],
      },
      {
        id: 'earlier',
        label: wording.earlierLabel,
        chats: [{ id: '3', title: `${wording.sampleMarker}: an older chat` }],
      },
    ],
    selectedChatId: '1',
    onOpenChat: () => {},
    getMenuItems: () => [...sampleMenuItems],
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatHistory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAPinnedGroup: Story = {
  args: {
    groups: [
      {
        id: 'pinned',
        label: wording.pinnedLabel,
        chats: [{ id: '9', title: `${wording.sampleMarker}: a pinned chat` }],
      },
      ...(meta.args.groups ?? []),
    ],
  },
}

export const EmptyGroupIsHidden: Story = {
  args: {
    groups: [
      { id: 'today', label: wording.todayLabel, chats: [] },
      {
        id: 'earlier',
        label: wording.earlierLabel,
        chats: [{ id: '3', title: `${wording.sampleMarker}: an older chat` }],
      },
    ],
  },
}

export const NoChatsAtAll: Story = { args: { groups: [] } }
