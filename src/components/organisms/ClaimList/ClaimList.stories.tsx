import type { Meta, StoryObj } from '@storybook/react-vite'
import { answeredQuickAnswer, buildClaim } from '@api/fixtures'
import { ClaimList } from './ClaimList'

const meta = {
  title: 'Components/Organisms/ClaimList',
  component: ClaimList,
  tags: ['autodocs'],
  args: {
    claims: answeredQuickAnswer.claims,
    sources: answeredQuickAnswer.sources,
    onOpenSource: () => {},
  },
} satisfies Meta<typeof ClaimList>

export default meta
type Story = StoryObj<typeof meta>

export const QuotedAndNotVerified: Story = {}

export const OnlyQuoted: Story = { args: { claims: answeredQuickAnswer.claims.slice(0, 1) } }

export const OnlyNotVerified: Story = { args: { claims: answeredQuickAnswer.claims.slice(1) } }

export const CitationNotAmongTheSources: Story = {
  args: {
    claims: [buildClaim({ quoteCitationId: 'sample:missing', citationIds: ['sample:missing'] })],
  },
}
