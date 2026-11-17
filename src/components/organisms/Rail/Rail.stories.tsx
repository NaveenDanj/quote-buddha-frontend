import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { Rail } from './Rail'

const sampleMenuItems = [
  { label: 'Rename', icon: 'edit', onSelect: () => {} },
  { label: 'Delete', icon: 'delete', onSelect: () => {} },
] as const

const meta = {
  title: 'Components/Organisms/Rail',
  component: Rail,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    groups: [
      {
        id: 'today',
        label: wording.todayLabel,
        chats: [
          { id: '1', title: `${wording.sampleMarker}: a chat from today` },
          { id: '2', title: `${wording.sampleMarker}: another chat` },
        ],
      },
      {
        id: 'earlier',
        label: wording.earlierLabel,
        chats: [{ id: '3', title: `${wording.sampleMarker}: an older chat` }],
      },
    ],
    selectedChatId: '1',
    tools: [
      {
        id: 'reader',
        label: wording.navReaderLabel,
        icon: 'reader',
        isCurrent: false,
        onOpen: () => {},
      },
      {
        id: 'terms',
        label: wording.navTermsLabel,
        icon: 'terms',
        isCurrent: false,
        onOpen: () => {},
      },
      {
        id: 'compare',
        label: wording.navCompareLabel,
        icon: 'compare',
        isCurrent: false,
        onOpen: () => {},
      },
      {
        id: 'notebook',
        label: wording.navNotebookLabel,
        icon: 'notes',
        isCurrent: false,
        onOpen: () => {},
      },
      {
        id: 'verify',
        label: wording.navVerifyLabel,
        icon: 'verify',
        isCurrent: false,
        onOpen: () => {},
      },
      {
        id: 'check',
        label: wording.navCheckLabel,
        icon: 'checkDocument',
        isCurrent: false,
        onOpen: () => {},
      },
    ],
    footerText: `${wording.sampleMarker}: corpus line`,
    onNewChat: () => {},
    onSearch: () => {},
    onOpenChat: () => {},
    getChatMenuItems: () => [...sampleMenuItems],
    onOpenSettings: () => {},
  },
  decorators: [
    (Story) => (
      <div className="h-screen max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Rail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ReaderIsCurrent: Story = {
  args: {
    tools: (meta.args.tools ?? []).map((tool) => ({ ...tool, isCurrent: tool.id === 'reader' })),
  },
}

export const NoChatsYet: Story = { args: { groups: [], selectedChatId: undefined } }
