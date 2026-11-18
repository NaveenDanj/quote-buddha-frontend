import { ReaderAction, ReaderTab, getAnswerNoteText, getClarificationText } from '@domain'
import { onParagraphText, selectedContextText } from '@wording'
import type { useReader } from './useReader'
import { useReaderAsk } from './useReaderAsk'
import { useReaderClarify } from './useReaderClarify'
import { useReaderNotes } from './useReaderNotes'

// Notes, explanations and questions about the selected passage, and what happens when one of them is started.
export function useReaderAssist(reader: ReturnType<typeof useReader>) {
  const paragraphId = reader.selectedParagraphId
  const notes = useReaderNotes({
    suttaId: reader.suttaId,
    sectionIndex: reader.sectionIndex,
    paragraphId,
    citationId: reader.selectedCitationId,
  })
  const clarify = useReaderClarify({
    paragraphId,
    getCitationId: reader.getCitationId,
    sectionNumber: reader.sectionIndex + 1,
    sectionTitle: reader.currentSection?.englishTitle ?? '',
  })
  const ask = useReaderAsk({ paragraphId, getCitationId: reader.getCitationId })

  const contextLabel = reader.selectedText
    ? selectedContextText(paragraphId ?? '', reader.selectedText)
    : onParagraphText(paragraphId ?? '')

  function startAction(action: ReaderAction, targetParagraphId: string, words?: string) {
    reader.startAction(action, targetParagraphId, words)
    if (action === ReaderAction.clarify) {
      void clarify.clarify(targetParagraphId)
    }
  }

  function submitAskBar() {
    reader.openTab(ReaderTab.ask)
    ask.submitQuestion()
  }

  function chooseSuggestion(question: string) {
    void ask.ask(question)
  }

  function saveClarificationAsNote() {
    if (clarify.clarification) {
      notes.saveSystemNote(getClarificationText(clarify.clarification))
      reader.setActiveTab(ReaderTab.notes)
    }
  }

  function saveAnswerAsNote(questionId: string) {
    const turn = ask.turns.find((candidate) => candidate.id === questionId)
    if (turn?.answer) {
      notes.saveSystemNote(getAnswerNoteText(turn))
      reader.setActiveTab(ReaderTab.notes)
    }
  }

  return {
    notes,
    clarify,
    ask,
    contextLabel,
    startAction,
    submitAskBar,
    chooseSuggestion,
    saveClarificationAsNote,
    saveAnswerAsNote,
  }
}
