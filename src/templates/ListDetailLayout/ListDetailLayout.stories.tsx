import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ListDetailLayout } from './ListDetailLayout'

const meta = {
  title: 'Templates/ListDetailLayout',
  component: ListDetailLayout,
  tags: ['autodocs'],
  args: {
    list: <Text variant="ui">{`${wording.sampleMarker}: the list`}</Text>,
    detail: <Text variant="ui">{`${wording.sampleMarker}: the details`}</Text>,
  },
} satisfies Meta<typeof ListDetailLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
