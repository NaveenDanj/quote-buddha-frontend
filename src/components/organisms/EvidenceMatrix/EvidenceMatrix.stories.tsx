import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  abstainedNotEnoughClaimsAnswer,
  answeredQuickAnswer,
  buildAnswer,
  buildClaim,
  buildSource,
} from '@api/fixtures'
import { EvidenceMatrix } from './EvidenceMatrix'

const manyPassages = ['one', 'two', 'three', 'four', 'five'].map((name) =>
  buildSource({ citationId: `sample:${name}` }),
)

const meta = {
  title: 'Components/Organisms/EvidenceMatrix',
  component: EvidenceMatrix,
  tags: ['autodocs'],
  args: { answer: answeredQuickAnswer },
} satisfies Meta<typeof EvidenceMatrix>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NothingToShow: Story = { args: { answer: abstainedNotEnoughClaimsAnswer } }

export const ManyPassagesScrollSideways: Story = {
  args: {
    answer: buildAnswer({
      claims: [
        buildClaim({ citationIds: ['sample:one', 'sample:two'], quoteCitationId: 'sample:one' }),
        buildClaim({ citationIds: ['sample:three'], quoteCitationId: 'sample:three' }),
      ],
      sources: manyPassages,
    }),
  },
  parameters: { viewport: { defaultViewport: 'phone' } },
}
