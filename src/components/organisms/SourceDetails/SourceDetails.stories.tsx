import type { Meta, StoryObj } from '@storybook/react-vite'
import { buildSource, sourceWithoutTranslator } from '@api/fixtures'
import { SourceDetails } from './SourceDetails'

const meta = {
  title: 'Components/Organisms/SourceDetails',
  component: SourceDetails,
  tags: ['autodocs'],
  args: { source: buildSource() },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-panel)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SourceDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TranslatorNotRecorded: Story = { args: { source: sourceWithoutTranslator } }

export const RetrievedButNotUsed: Story = { args: { source: buildSource({ used: false }) } }

export const WithOpenInReader: Story = { args: { onOpenInReader: () => {} } }
