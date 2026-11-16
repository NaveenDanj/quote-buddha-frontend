import clsx from 'clsx'
import type { ReactNode } from 'react'
import { IconButton } from '@ds/atoms/IconButton'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Tabs, type TabItem } from '@ds/atoms/Tabs'
import { Text } from '@ds/atoms/Text'
import type { Answer } from '@domain'
import { wording } from '@wording'
import { GlossChip } from '@components/molecules/GlossChip'
import { EvidenceMatrix } from '@components/organisms/EvidenceMatrix'
import { SourceDetails } from '@components/organisms/SourceDetails'

export const ResearchTab = {
  sources: 'sources',
  evidence: 'evidence',
  terms: 'terms',
  notes: 'notes',
} as const
export type ResearchTab = (typeof ResearchTab)[keyof typeof ResearchTab]

function toResearchTab(value: string): ResearchTab {
  return Object.values(ResearchTab).find((tab) => tab === value) ?? ResearchTab.sources
}

type ResearchPanelProps = {
  answer: Answer
  activeTab: ResearchTab
  onTabChange: (tab: ResearchTab) => void
  onClose: () => void
  selectedCitationId?: string
  onOpenInReader: (citationId: string) => void
  onOpenTerm: (pali: string) => void
  // The notes for this answer, built by the page.
  notes: ReactNode
}

type SourcesTabProps = Pick<ResearchPanelProps, 'answer' | 'selectedCitationId' | 'onOpenInReader'>

function SourcesTab({ answer, selectedCitationId, onOpenInReader }: SourcesTabProps) {
  return (
    <ol className="m-0 grid list-none gap-4 p-0">
      {answer.sources.map((source) => (
        <li
          key={source.citationId}
          aria-current={source.citationId === selectedCitationId ? 'true' : undefined}
          className={clsx(
            'border-l-(length:--border-selected) pl-3 forced-colors:border-l-8',
            source.citationId === selectedCitationId
              ? 'border-l-accent bg-surface-subtle'
              : 'border-l-transparent',
          )}
        >
          <SourceDetails source={source} onOpenInReader={onOpenInReader} />
        </li>
      ))}
    </ol>
  )
}

function TermsTab({ answer, onOpenTerm }: Pick<ResearchPanelProps, 'answer' | 'onOpenTerm'>) {
  if (answer.terms.length === 0) {
    return (
      <Text variant="caption" as="p" className="text-text-muted">
        {wording.noTermsText}
      </Text>
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      {answer.terms.map((term) => (
        <GlossChip key={term.pali} pali={term.pali} gloss={term.gloss} onOpen={onOpenTerm} />
      ))}
    </div>
  )
}

// The side panel for one answer: its sources, the evidence matrix, its terms, and notes.
export function ResearchPanel({
  answer,
  activeTab,
  onTabChange,
  onClose,
  selectedCitationId,
  onOpenInReader,
  onOpenTerm,
  notes,
}: ResearchPanelProps) {
  const tabs: TabItem[] = [
    {
      value: ResearchTab.sources,
      label: wording.sourcesLabel,
      panel: (
        <SourcesTab
          answer={answer}
          selectedCitationId={selectedCitationId}
          onOpenInReader={onOpenInReader}
        />
      ),
    },
    {
      value: ResearchTab.evidence,
      label: wording.evidenceTabLabel,
      panel: <EvidenceMatrix answer={answer} />,
    },
    {
      value: ResearchTab.terms,
      label: wording.termsTabLabel,
      panel: <TermsTab answer={answer} onOpenTerm={onOpenTerm} />,
    },
    { value: ResearchTab.notes, label: wording.notesTabLabel, panel: notes },
  ]

  return (
    <Surface
      as="aside"
      aria-label={wording.researchPanelLabel}
      padding={SurfaceSpace.medium}
      gap={SurfaceSpace.medium}
    >
      <div className="flex items-center justify-between gap-3">
        <Text variant="heading3" as="h2">
          {wording.researchPanelLabel}
        </Text>
        <IconButton icon="close" label={wording.closePanelLabel} size="small" onClick={onClose} />
      </div>
      <Tabs
        label={wording.researchTabsLabel}
        tabs={tabs}
        value={activeTab}
        onValueChange={(value) => onTabChange(toResearchTab(value))}
      />
    </Surface>
  )
}
