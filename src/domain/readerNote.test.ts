import { describe, expect, it } from 'vitest'
import {
  NoteScope,
  countNotesByParagraph,
  filterNotesByScope,
  toNoteScope,
  type ReaderNote,
} from './readerNote'

function buildNote(id: string, sectionIndex: number, paragraphId: string): ReaderNote {
  return {
    id,
    suttaId: 'dn-1',
    sectionIndex,
    paragraphId,
    citationId: `pitaka_lk:dn-1:${paragraphId}`,
    text: 'Layout sample',
    isAiEnhanced: false,
  }
}

const notes = [buildNote('a', 0, '1.1'), buildNote('b', 0, '1.1'), buildNote('c', 1, '2.1')]

describe('notes of the Reader', () => {
  it('shows the notes of this section, or of the whole text', () => {
    expect(filterNotesByScope(notes, NoteScope.section, 'dn-1', 0)).toHaveLength(2)
    expect(filterNotesByScope(notes, NoteScope.all, 'dn-1', 0)).toHaveLength(3)
  })

  it('shows no notes of another text', () => {
    expect(filterNotesByScope(notes, NoteScope.all, 'mn-1', 0)).toHaveLength(0)
  })

  it('counts the notes on each paragraph', () => {
    expect(countNotesByParagraph(notes)).toEqual({ '1.1': 2, '2.1': 1 })
  })

  it('falls back to this section for an unknown scope', () => {
    expect(toNoteScope('all')).toBe(NoteScope.all)
    expect(toNoteScope('anything')).toBe(NoteScope.section)
  })
})
