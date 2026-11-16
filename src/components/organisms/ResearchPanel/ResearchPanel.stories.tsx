import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { wording } from '@wording'
import { abstainedWeakEvidenceAnswer, answeredQuickAnswer } from '@api/fixtures'
import { NoteCard } from '@components/molecules/NoteCard'
import { ResearchPanel, ResearchTab } from './ResearchPanel'

const sampleNotes = (
  <NoteCard
    passageLabel="Sample work · 44.5"
    citationId="sample:dn-1:1"
    onOpenPassage={() => {}}
    text={`${wording.sampleMarker}: a note the person wrote.`}
    actionsLabel="Note actions"
  />
)

const meta = {
  title: 'Components/Organisms/ResearchPanel',
  component: ResearchPanel,
  tags: ['autodocs'],
  args: {
    answer: answeredQuickAnswer,
    activeTab: ResearchTab.sources,
    onTabChange: () => {},
    onClose: () => {},
    onOpenInReader: () => {},
    onOpenTerm: () => {},
    notes: sampleNotes,
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-reader-side) border border-border">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ResearchPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Sources: Story = {}

export const SelectedSource: Story = { args: { selectedCitationId: 'sample:dn-1:1' } }

export const Evidence: Story = { args: { activeTab: ResearchTab.evidence } }

export const Terms: Story = { args: { activeTab: ResearchTab.terms } }

export const NoTerms: Story = {
  args: { activeTab: ResearchTab.terms, answer: abstainedWeakEvidenceAnswer },
}

export const Notes: Story = { args: { activeTab: ResearchTab.notes } }

function SwitchingExample() {
  const [activeTab, setActiveTab] = useState<ResearchTab>(ResearchTab.sources)
  return (
    <ResearchPanel
      answer={answeredQuickAnswer}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={() => {}}
      onOpenInReader={() => {}}
      onOpenTerm={() => {}}
      notes={sampleNotes}
    />
  )
}

export const Interactive: Story = { render: () => <SwitchingExample /> }
