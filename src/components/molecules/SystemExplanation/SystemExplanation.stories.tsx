import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { SystemExplanation } from './SystemExplanation'

const meta = {
  title: 'Components/Molecules/SystemExplanation',
  component: SystemExplanation,
  tags: ['autodocs'],
  args: {
    heading: wording.simpleAnswerHeading,
    label: wording.simpleAnswerLabel,
    children: `${wording.sampleMarker}: plain-language summary written by the system.`,
  },
} satisfies Meta<typeof SystemExplanation>

export default meta
type Story = StoryObj<typeof meta>

export const SimpleAnswer: Story = {}

export const OtherSystemText: Story = {
  args: { heading: 'Clarification', label: wording.systemLabel },
}

export const LongText: Story = {
  args: { children: `${wording.sampleMarker}: a longer summary. `.repeat(12) },
}
