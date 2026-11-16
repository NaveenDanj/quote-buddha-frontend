import type { Meta, StoryObj } from '@storybook/react-vite'
import { EvidenceState, evidenceStates } from '@domain'
import { EvidenceTag } from './EvidenceTag'

const meta = {
  title: 'Components/Molecules/EvidenceTag',
  component: EvidenceTag,
  tags: ['autodocs'],
  args: { state: EvidenceState.directQuote },
  argTypes: {
    state: { control: 'select', options: evidenceStates },
  },
} satisfies Meta<typeof EvidenceTag>

export default meta
type Story = StoryObj<typeof meta>

export const DirectQuote: Story = {}

export const NotVerified: Story = { args: { state: EvidenceState.notVerified } }

export const NotUsed: Story = { args: { state: EvidenceState.notUsed } }

export const Removed: Story = { args: { state: EvidenceState.removed } }

export const NotEstablished: Story = { args: { state: EvidenceState.notEstablished } }

export const NotYetIncluded: Story = { args: { state: EvidenceState.notYetIncluded } }

export const AllStates: Story = {
  render: () => (
    <div className="grid gap-3">
      {evidenceStates.map((state) => (
        <EvidenceTag key={state} state={state} />
      ))}
    </div>
  ),
}
