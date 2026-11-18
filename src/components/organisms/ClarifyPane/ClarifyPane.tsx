import { Button } from '@ds/atoms/Button'
import { EmptyState } from '@ds/atoms/EmptyState'
import { Text } from '@ds/atoms/Text'
import type { Clarification } from '@domain'
import { clarifyingText, wording } from '@wording'
import { PassageContext } from '@components/molecules/PassageContext'
import { ClarificationView } from './ClarificationView'

type ClarifyPaneProps = {
  contextLabel: string
  paragraphId?: string
  // The explanation of the selected paragraph. Missing until someone asks for it.
  clarification?: Clarification
  isClarifying: boolean
  onClarify: () => void
  onSaveAsNote: () => void
  onOpenPassage: (citationId: string) => void
  onOpenTerm: (pali: string) => void
}

// The Clarify tab of the Reader: ask for the meaning of the selected passage, then read what the system wrote.
export function ClarifyPane({
  contextLabel,
  paragraphId,
  clarification,
  isClarifying,
  onClarify,
  onSaveAsNote,
  onOpenPassage,
  onOpenTerm,
}: ClarifyPaneProps) {
  return (
    <div className="grid content-start gap-section">
      <div className="flex flex-wrap items-center justify-between gap-group">
        <PassageContext label={contextLabel} />
        <Button
          variant="secondary"
          size="small"
          leadingIcon="ai"
          disabled={isClarifying || paragraphId === undefined}
          onClick={onClarify}
        >
          {isClarifying ? wording.clarifyingLabel : wording.clarifyThisLabel}
        </Button>
      </div>
      {isClarifying && paragraphId ? (
        <Text variant="caption" as="p" isMuted role="status">
          {clarifyingText(paragraphId)}
        </Text>
      ) : null}
      {clarification ? (
        <ClarificationView
          clarification={clarification}
          onSaveAsNote={onSaveAsNote}
          onOpenPassage={onOpenPassage}
          onOpenTerm={onOpenTerm}
        />
      ) : null}
      {!clarification && !isClarifying ? (
        <EmptyState icon="ai" title={wording.clarifyEmptyText} />
      ) : null}
    </div>
  )
}
