import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { UserMessage } from './UserMessage'

const meta = {
  title: 'Components/Organisms/UserMessage',
  component: UserMessage,
  tags: ['autodocs'],
  args: {
    text: `${wording.sampleMarker}: a question the person asked?`,
    currentVersion: 1,
    versionCount: 1,
    onEdit: () => {},
    onPreviousVersion: () => {},
    onNextVersion: () => {},
  },
} satisfies Meta<typeof UserMessage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EditedWithVersions: Story = { args: { currentVersion: 2, versionCount: 3 } }

export const LongQuestionWraps: Story = {
  args: {
    text: `${wording.sampleMarker}: ${'a very long question that goes on and on '.repeat(8)}?`,
  },
}
