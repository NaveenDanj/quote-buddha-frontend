import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ReaderSidePane } from './ReaderSidePane'

const meta = {
  title: 'Components/Organisms/ReaderSidePane',
  component: ReaderSidePane,
  tags: ['autodocs'],
  args: {
    onClose: () => {},
    activeTab: 'notes',
    onTabChange: () => {},
    tabs: [
      {
        value: 'notes',
        label: wording.notesTabLabel,
        icon: 'notes',
        panel: <Text variant="ui">{`${wording.sampleMarker}: the content of the notes tab.`}</Text>,
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="grid h-96 max-w-(--layout-reader-side) border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReaderSidePane>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
