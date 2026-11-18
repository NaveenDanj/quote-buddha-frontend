import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { TwoColumnLayout } from './TwoColumnLayout'

const meta = {
  title: 'Templates/TwoColumnLayout',
  component: TwoColumnLayout,
  tags: ['autodocs'],
  args: {
    main: <Text variant="ui">{`${wording.sampleMarker}: the main column`}</Text>,
    aside: <Text variant="ui">{`${wording.sampleMarker}: the narrow column`}</Text>,
  },
} satisfies Meta<typeof TwoColumnLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
