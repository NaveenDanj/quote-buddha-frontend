import { ReaderTab, toReaderTab } from '@domain'
import { wording } from '@wording'
import { AskPane } from '@components/organisms/AskPane'
import { ClarifyPane } from '@components/organisms/ClarifyPane'
import { NotesPane } from '@components/organisms/NotesPane'
import { ReaderSidePane } from '@components/organisms/ReaderSidePane'
import { doNothingYet } from '@pages/doNothingYet'
import type { useReader } from './useReader'
import type { useReaderAssist } from './useReaderAssist'

type ReaderSideProps = {
  workRef: string
  reader: ReturnType<typeof useReader>
  assist: ReturnType<typeof useReaderAssist>
}

type TabContext = {
  workRef: string
  reader: ReturnType<typeof useReader>
  assist: ReturnType<typeof useReaderAssist>
}

function getNotesTab({ workRef, reader, assist }: TabContext) {
  const { notes } = assist
  return {
    value: ReaderTab.notes,
    label: wording.notesTabLabel,
    icon: 'notes' as const,
    panel: (
      <NotesPane
        contextLabel={assist.contextLabel}
        scope={notes.scope}
        onScopeChange={notes.setScope}
        workRef={workRef}
        notes={notes.visibleNotes}
        onOpenPassage={reader.openPassage}
        draft={notes.draft}
        onDraftChange={notes.setDraft}
        canSave={notes.canSave}
        onSave={notes.save}
        canEnhance={notes.canEnhance}
        isEnhancing={notes.isEnhancing}
        onEnhance={notes.enhance}
        suggestion={notes.suggestion}
        onUseSuggestion={notes.acceptSuggestion}
        onDiscardSuggestion={notes.discardSuggestion}
      />
    ),
  }
}

function getClarifyTab({ reader, assist }: TabContext) {
  const { clarify } = assist
  return {
    value: ReaderTab.clarify,
    label: wording.clarifyTabLabel,
    icon: 'ai' as const,
    panel: (
      <ClarifyPane
        contextLabel={assist.contextLabel}
        paragraphId={reader.selectedParagraphId}
        clarification={clarify.clarification}
        isClarifying={clarify.isClarifying}
        onClarify={() => void clarify.clarify()}
        onSaveAsNote={assist.saveClarificationAsNote}
        onOpenPassage={reader.openPassage}
        onOpenTerm={doNothingYet}
      />
    ),
  }
}

function getAskTab({ reader, assist }: TabContext) {
  return {
    value: ReaderTab.ask,
    label: wording.askTabLabel,
    icon: 'ask' as const,
    panel: (
      <AskPane
        turns={assist.ask.turns}
        onChooseSuggestion={assist.chooseSuggestion}
        onSaveAsNote={assist.saveAnswerAsNote}
        onOpenPassage={reader.openPassage}
      />
    ),
  }
}

// The pane beside the text: notes, an explanation of the selected passage, and questions about it.
export function ReaderSide({ workRef, reader, assist }: ReaderSideProps) {
  const context = { workRef, reader, assist }

  return (
    <ReaderSidePane
      tabs={[getNotesTab(context), getClarifyTab(context), getAskTab(context)]}
      activeTab={reader.activeTab}
      onTabChange={(tab) => reader.setActiveTab(toReaderTab(tab))}
      onClose={reader.closeSide}
    />
  )
}
