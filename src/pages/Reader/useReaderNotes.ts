import { useState } from 'react'
import { NoteScope, countNotesByParagraph, filterNotesByScope } from '@domain'
import { useCreateNoteMutation, useGetNotesQuery } from '@api/notes'
import { useNoteDraft } from './useNoteDraft'

type NoteTarget = {
  suttaId: string
  sectionIndex: number
  // The paragraph a new note is attached to. Left out when nothing is selected.
  paragraphId?: string
  citationId?: string
}

// The notes of the Reader: which ones to show, how many there are, and saving the note being written.
export function useReaderNotes(target: NoteTarget) {
  const { data: notes } = useGetNotesQuery()
  const [createNote] = useCreateNoteMutation()
  const [scope, setScope] = useState<NoteScope>(NoteScope.section)
  const noteDraft = useNoteDraft(target.paragraphId)

  const allNotes = notes ?? []
  const notesOfText = allNotes.filter((note) => note.suttaId === target.suttaId)
  const hasText = noteDraft.draft.trim().length > 0
  const canWrite = hasText && target.paragraphId !== undefined && target.citationId !== undefined

  function save() {
    if (!canWrite || !target.paragraphId || !target.citationId) {
      return
    }
    createNote({
      suttaId: target.suttaId,
      sectionIndex: target.sectionIndex,
      paragraphId: target.paragraphId,
      citationId: target.citationId,
      text: noteDraft.draft.trim(),
      isAiEnhanced: noteDraft.originalText !== undefined,
      originalText: noteDraft.originalText,
    })
    noteDraft.clearDraft()
  }

  // An explanation or an answer saved as a note. It is marked as the system's wording and has no original.
  function saveSystemNote(text: string) {
    if (!target.paragraphId || !target.citationId) {
      return
    }
    createNote({
      suttaId: target.suttaId,
      sectionIndex: target.sectionIndex,
      paragraphId: target.paragraphId,
      citationId: target.citationId,
      text,
      isAiEnhanced: true,
      originalText: '',
    })
  }

  return {
    scope,
    setScope,
    visibleNotes: filterNotesByScope(allNotes, scope, target.suttaId, target.sectionIndex),
    noteCount: notesOfText.length,
    noteCountByParagraphId: countNotesByParagraph(notesOfText),
    draft: noteDraft.draft,
    setDraft: noteDraft.setDraft,
    canSave: canWrite,
    canEnhance: canWrite,
    isEnhancing: noteDraft.isEnhancing,
    suggestion: noteDraft.suggestion,
    enhance: noteDraft.enhance,
    acceptSuggestion: noteDraft.acceptSuggestion,
    discardSuggestion: noteDraft.discardSuggestion,
    save,
    saveSystemNote,
  }
}
