import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { SuggestionBlock } from './SuggestionBlock'

const meta = {
  title: 'Components/Molecules/SuggestionBlock',
  component: SuggestionBlock,
  tags: ['autodocs'],
  args: {
    onUse: () => {},
    onDiscard: () => {},
    children: `${wording.sampleMarker}: a clearer wording of the note, suggested by the system.`,
  },
} satisfies Meta<typeof SuggestionBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongText: Story = {
  args: { children: `${wording.sampleMarker}: a longer suggestion. `.repeat(12) },
}
