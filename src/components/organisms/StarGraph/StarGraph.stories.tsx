import type { Meta, StoryObj } from '@storybook/react-vite'
import { deriveSourceGraph } from '@domain'
import {
  abstainedWeakEvidenceAnswer,
  answeredQuickAnswer,
  buildAnswer,
  buildClaim,
  buildSource,
} from '@api/fixtures'
import { StarGraph } from './StarGraph'

const sampleNames = ['one', 'two', 'three', 'four', 'five', 'six']

const manyClaimsAnswer = buildAnswer({
  claims: sampleNames.map((name) =>
    buildClaim({ citationIds: [`sample:${name}`], quoteCitationId: `sample:${name}` }),
  ),
  sources: sampleNames.map((name) => buildSource({ citationId: `sample:${name}` })),
  droppedClaimCount: 2,
})

const meta = {
  title: 'Components/Organisms/StarGraph',
  component: StarGraph,
  tags: ['autodocs'],
  args: { graph: deriveSourceGraph(answeredQuickAnswer), onSelectNode: () => {} },
} satisfies Meta<typeof StarGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithASelectedBox: Story = { args: { selectedNodeId: 'claim-0' } }

export const WithARemovedBoxSelected: Story = { args: { selectedNodeId: 'removed' } }

export const WithATextBoxSelected: Story = { args: { selectedNodeId: 'text-Sample work' } }

export const OnlyTheQuestion: Story = {
  args: { graph: deriveSourceGraph(abstainedWeakEvidenceAnswer) },
}

export const ManyClaims: Story = { args: { graph: deriveSourceGraph(manyClaimsAnswer) } }

export const AtPhoneWidthScrollsSideways: Story = {
  parameters: { viewport: { defaultViewport: 'phone' } },
}
