import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ToolPageLayout } from './ToolPageLayout'

const meta = {
  title: 'Templates/ToolPageLayout',
  component: ToolPageLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="grid h-dvh">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ToolPageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text variant="heading1">{wording.sampleMarker}</Text>
        <Text variant="ui">{wording.sampleMarker}: the content of a tool page.</Text>
      </>
    ),
  },
}
