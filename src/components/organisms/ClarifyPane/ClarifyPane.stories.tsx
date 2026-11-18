import type { Meta, StoryObj } from '@storybook/react-vite'
import type { Clarification } from '@domain'
import { ClarifyPane } from './ClarifyPane'

const sampleClarification: Clarification = {
  plainMeaning: 'Layout sample: a plain-language explanation, a few sentences long.',
  keyTerms: [
    { pali: 'diṭṭhi', gloss: 'view' },
    { pali: 'attā', gloss: 'self' },
  ],
  inContext: 'Layout sample: how this passage connects to the sections around it.',
  doesNotSay:
    'Layout sample: a caution about reading more into the passage than the text supports.',
  basedOnCitationId: 'pitaka_lk:dn-1:1:1',
  basedOnLabel: 'DN 1 · 1.1',
}

const meta = {
  title: 'Components/Organisms/ClarifyPane',
  component: ClarifyPane,
  tags: ['autodocs'],
  args: {
    contextLabel: 'On 1.1',
    paragraphId: '1.1',
    isClarifying: false,
    onClarify: () => {},
    onSaveAsNote: () => {},
    onOpenPassage: () => {},
    onOpenTerm: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-reader-side)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClarifyPane>

export default meta
type Story = StoryObj<typeof meta>

export const NotAskedYet: Story = {}

export const Clarifying: Story = { args: { isClarifying: true } }

export const Explained: Story = { args: { clarification: sampleClarification } }
