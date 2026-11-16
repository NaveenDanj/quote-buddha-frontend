import type { Meta, StoryObj } from '@storybook/react-vite'
import { EvidenceState, evidenceStates } from '@domain'
import { EvidenceGlyph } from './EvidenceGlyph'

const meta = {
  title: 'Components/Molecules/EvidenceGlyph',
  component: EvidenceGlyph,
  tags: ['autodocs'],
  args: { state: EvidenceState.directQuote },
  argTypes: {
    state: { control: 'select', options: evidenceStates },
  },
} satisfies Meta<typeof EvidenceGlyph>

export default meta
type Story = StoryObj<typeof meta>

export const DirectQuote: Story = {}

export const NotVerified: Story = { args: { state: EvidenceState.notVerified } }

export const Removed: Story = { args: { state: EvidenceState.removed } }

export const AllStates: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-text">
      {evidenceStates.map((state) => (
        <EvidenceGlyph key={state} state={state} />
      ))}
    </div>
  ),
}
