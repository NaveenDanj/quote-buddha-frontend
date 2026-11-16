import type { Meta, StoryObj } from '@storybook/react-vite'
import { EvidenceState, evidenceStates } from '@domain'
import { Legend } from './Legend'

const meta = {
  title: 'Components/Molecules/Legend',
  component: Legend,
  tags: ['autodocs'],
  args: {
    label: 'Evidence key',
    states: [EvidenceState.directQuote, EvidenceState.notVerified, EvidenceState.notUsed],
  },
} satisfies Meta<typeof Legend>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllStates: Story = { args: { states: evidenceStates } }

export const AtPhoneWidthWraps: Story = {
  args: { states: evidenceStates },
  parameters: { viewport: { defaultViewport: 'phone' } },
}
