import { describe, expect, it } from 'vitest'
import {
  ReaderAction,
  ReaderTab,
  getAnswerNoteText,
  getClarificationText,
  getTabForAction,
  toReaderTab,
} from './readerAssist'

describe('reader assist helpers', () => {
  it('opens the tab that matches the action', () => {
    expect(getTabForAction(ReaderAction.clarify)).toBe(ReaderTab.clarify)
    expect(getTabForAction(ReaderAction.ask)).toBe(ReaderTab.ask)
    expect(getTabForAction(ReaderAction.note)).toBe(ReaderTab.notes)
  })

  it('falls back to the notes tab for an unknown value', () => {
    expect(toReaderTab('anything')).toBe(ReaderTab.notes)
  })

  it('writes an explanation out as plain text', () => {
    const text = getClarificationText({
      plainMeaning: 'Meaning',
      keyTerms: [],
      inContext: 'Context',
      doesNotSay: 'Caution',
      basedOnCitationId: 'a',
      basedOnLabel: 'DN 1 · 1.1',
    })
    expect(text).toBe('Meaning\n\nContext\n\nCaution')
  })

  it('writes a question and its answer as a note', () => {
    const note = getAnswerNoteText({
      id: '1',
      question: 'What does it mean?',
      paragraphId: '1.1',
      answer: { text: 'Sample answer', citationId: 'a', citationLabel: 'DN 1 · 1.1' },
    })
    expect(note).toBe('Q: What does it mean?\nA: Sample answer')
  })
})
