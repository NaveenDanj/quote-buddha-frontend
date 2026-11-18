import type { ReactNode } from 'react'
import { IconButton } from '@ds/atoms/IconButton'
import { Surface, SurfaceRows } from '@ds/atoms/Surface'
import { Tabs, type TabItem } from '@ds/atoms/Tabs'
import { Text } from '@ds/atoms/Text'
import { getCitationLabel, getSourceEvidenceState, type Answer } from '@domain'
import { wording } from '@wording'
import { GlossChip } from '@components/molecules/GlossChip'
import { EvidenceMatrix } from '@components/organisms/EvidenceMatrix'
import { SourceItem } from './SourceItem'

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
  onCompare?: (citationId: string) => void
  onSave?: (citationId: string) => void
  onOpenTerm: (pali: string) => void
  // The notes for this answer, built by the page.
  notes: ReactNode
}

type SourcesTabProps = Pick<
  ResearchPanelProps,
  'answer' | 'selectedCitationId' | 'onOpenInReader' | 'onCompare' | 'onSave'
>

// The chosen source is open. With none chosen, the first one is.
function isOpenAtStart(position: number, citationId: string, selectedCitationId?: string): boolean {
  return selectedCitationId === undefined ? position === 0 : citationId === selectedCitationId
}

function SourcesTab({ answer, selectedCitationId, ...actions }: SourcesTabProps) {
  return (
    <ol className="grid list-none gap-section">
      {answer.sources.map((source, position) => {
        const isOpen = isOpenAtStart(position, source.citationId, selectedCitationId)
        return (
          <li
            key={`${source.citationId}-${isOpen}`}
            aria-current={source.citationId === selectedCitationId ? 'true' : undefined}
          >
            <SourceItem
              source={source}
              number={position + 1}
              label={getCitationLabel(source)}
              state={getSourceEvidenceState(answer, source)}
              isOpenAtStart={isOpen}
              {...actions}
            />
          </li>
        )
      })}
    </ol>
  )
}

function TermsTab({ answer, onOpenTerm }: Pick<ResearchPanelProps, 'answer' | 'onOpenTerm'>) {
  if (answer.terms.length === 0) {
    return (
      <Text variant="caption" as="p" isMuted>
        {wording.noTermsText}
      </Text>
    )
  }
  return (
    <div className="flex flex-wrap gap-group">
      {answer.terms.map((term) => (
        <GlossChip key={term.pali} pali={term.pali} gloss={term.gloss} onOpen={onOpenTerm} />
      ))}
    </div>
  )
}

function getTabs(props: ResearchPanelProps): TabItem[] {
  const { answer, selectedCitationId, onOpenInReader, onCompare, onSave, onOpenTerm, notes } = props
  return [
    {
      value: ResearchTab.sources,
      label: wording.sourcesLabel,
      panel: (
        <SourcesTab
          answer={answer}
          selectedCitationId={selectedCitationId}
          onOpenInReader={onOpenInReader}
          onCompare={onCompare}
          onSave={onSave}
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
}

// The side panel for one answer. The title and the tabs stay in place, and only the content scrolls.
export function ResearchPanel(props: ResearchPanelProps) {
  const { activeTab, onTabChange, onClose } = props

  return (
    <Surface
      as="aside"
      aria-label={wording.researchPanelLabel}
      rows={SurfaceRows.headerThenFill}
      className="h-full"
    >
      <div className="flex items-center justify-between gap-block pt-card-tight pr-card pb-group pl-card">
        <Text variant="label" as="h2" className="tracking-label">
          {wording.researchPanelLabel}{' '}
          <span className="font-normal text-text-muted">{wording.latestAnswerNote}</span>
        </Text>
        <IconButton icon="close" label={wording.closePanelLabel} size="small" onClick={onClose} />
      </div>
      <Tabs
        label={wording.researchTabsLabel}
        tabs={getTabs(props)}
        value={activeTab}
        onValueChange={(value) => onTabChange(toResearchTab(value))}
        className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)]"
        listClassName="px-card"
        contentClassName="relative overflow-y-auto px-card pb-area"
      />
    </Surface>
  )
}
