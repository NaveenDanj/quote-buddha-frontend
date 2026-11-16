import type { Meta, StoryObj } from '@storybook/react-vite'
import { EvidenceState } from '@domain'
import { wording } from '@wording'
import { Notice } from './Notice'

const meta = {
  title: 'Components/Molecules/Notice',
  component: Notice,
  tags: ['autodocs'],
  args: { title: wording.abstentionText },
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const NotEstablished: Story = {}

export const NotYetIncluded: Story = {
  args: { state: EvidenceState.notYetIncluded, title: wording.partialCorpusNote },
}

export const WithNextStep: Story = {
  args: {
    children: <p className="m-0 font-ui text-ui">{wording.sampleMarker}: next step goes here.</p>,
  },
}
