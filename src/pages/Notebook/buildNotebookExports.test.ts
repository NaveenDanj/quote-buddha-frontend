import { describe, expect, it } from 'vitest'
import type { NotebookEntry } from '@domain'
import { buildNotebookBibtex, buildNotebookMarkdown } from './buildNotebookExports'

const date = Date.UTC(2026, 10, 16)

const aboutAPassage: NotebookEntry = {
  id: '1',
  createdAtInMilliseconds: date,
  text: 'Layout sample note',
  isAiEnhanced: true,
  originalText: 'first',
  passage: { citationId: 'pitaka_lk:dn-1:1:1', label: 'DN 1 · 1.1' },
}

const aboutNothing: NotebookEntry = {
  id: '2',
  createdAtInMilliseconds: date,
  text: 'A free note',
  isAiEnhanced: false,
}

describe('notebook exports', () => {
  it('writes each note with its date, and a passage reference when it has one', () => {
    const markdown = buildNotebookMarkdown('Sample', [aboutAPassage, aboutNothing], date)
    expect(markdown).toContain('## DN 1 · 1.1 · 2026-11-16')
    expect(markdown).toContain('Reference: DN 1 · 1.1')
    expect(markdown).toContain('## Notebook · 2026-11-16')
  })

  it('marks a note the system rewrote', () => {
    const markdown = buildNotebookMarkdown('Sample', [aboutAPassage], date)
    expect(markdown).toContain('AI-enhanced. Written by the system')
  })

  it('ends with the corpus version and the date', () => {
    const markdown = buildNotebookMarkdown('Sample', [], date)
    expect(markdown).toContain('Generated 2026-11-16 from corpus v0.1')
  })

  it('writes one BibTeX entry for each passage', () => {
    const bibtex = buildNotebookBibtex([
      { citationId: 'pitaka_lk:dn-1:1:1', label: 'DN 1 · 1.1', useCount: 2 },
    ])
    expect(bibtex).toContain('@misc{pitaka_lk_dn_1_1_1,')
    expect(bibtex).toContain('title = {DN 1 · 1.1}')
  })
})
