import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ResearchPanel } from '@components/organisms/ResearchPanel'
import { doNothingYet } from '@pages/doNothingYet'
import type { useResearchSelection } from './useResearchSelection'

type ConversationPanelProps = {
  research: ReturnType<typeof useResearchSelection>
}

export function ConversationPanel({ research }: ConversationPanelProps) {
  if (!research.answer || !research.selection) {
    return null
  }
  return (
    <ResearchPanel
      answer={research.answer}
      activeTab={research.selection.tab}
      onTabChange={research.changeTab}
      onClose={research.closePanel}
      selectedCitationId={research.selection.citationId}
      onOpenInReader={doNothingYet}
      onCompare={doNothingYet}
      onSave={doNothingYet}
      onOpenTerm={doNothingYet}
      notes={
        <Text variant="caption" as="p" isMuted>
          {wording.noNotesText}
        </Text>
      }
    />
  )
}
