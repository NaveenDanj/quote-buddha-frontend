import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { SuggestionChips } from './SuggestionChips'

const meta = {
  title: 'Components/Molecules/SuggestionChips',
  component: SuggestionChips,
  tags: ['autodocs'],
  args: {
    label: wording.exampleQuestionsLabel,
    suggestions: [
      `${wording.sampleMarker}: a short example question?`,
      `${wording.sampleMarker}: a much longer example question that has to wrap onto a second line?`,
    ],
    onChoose: () => {},
  },
} satisfies Meta<typeof SuggestionChips>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const VeryLongSuggestionWraps: Story = {
  args: { suggestions: [`${wording.sampleMarker}: ${'a very long example question '.repeat(8)}?`] },
  parameters: { viewport: { defaultViewport: 'phone' } },
}
