import type { Meta, StoryObj } from '@storybook/react-vite'
import { abstainedNotEnoughClaimsAnswer, abstainedWeakEvidenceAnswer } from '@api/fixtures'
import { AbstainNotice } from './AbstainNotice'

const meta = {
  title: 'Components/Organisms/AbstainNotice',
  component: AbstainNotice,
  tags: ['autodocs'],
  args: { answer: abstainedWeakEvidenceAnswer },
} satisfies Meta<typeof AbstainNotice>

export default meta
type Story = StoryObj<typeof meta>

export const WeakEvidence: Story = {}

export const NotEnoughVerifiedClaims: Story = { args: { answer: abstainedNotEnoughClaimsAnswer } }
