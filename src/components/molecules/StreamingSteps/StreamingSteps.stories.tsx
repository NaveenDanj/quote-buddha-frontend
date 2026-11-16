import type { Meta, StoryObj } from '@storybook/react-vite'
import { StreamStepKind } from '@domain'
import { wording } from '@wording'
import { StreamingSteps } from './StreamingSteps'

const sampleSteps = [
  { kind: StreamStepKind.searching, text: `${wording.sampleMarker}: searching the included texts` },
  { kind: StreamStepKind.retrieved, text: `${wording.sampleMarker}: passages found`, count: 12 },
  { kind: StreamStepKind.drafting, text: `${wording.sampleMarker}: drafting the explanation` },
  { kind: StreamStepKind.verifying, text: `${wording.sampleMarker}: checking every quote` },
]

const meta = {
  title: 'Components/Molecules/StreamingSteps',
  component: StreamingSteps,
  tags: ['autodocs'],
  args: { steps: sampleSteps, isStreaming: true },
} satisfies Meta<typeof StreamingSteps>

export default meta
type Story = StoryObj<typeof meta>

export const Streaming: Story = {}

export const JustStarted: Story = { args: { steps: sampleSteps.slice(0, 1) } }

export const Finished: Story = { args: { isStreaming: false } }

export const NoStepsYet: Story = { args: { steps: [] } }
