import { describe, expect, it } from 'vitest'
import { formatNoteDate, getSourcesUsed, sortNewestFirst, type NotebookEntry } from './notebook'

function buildEntry(
  id: string,
  createdAtInMilliseconds: number,
  citationId?: string,
): NotebookEntry {
  return {
    id,
    createdAtInMilliseconds,
    text: 'Layout sample',
    isAiEnhanced: false,
    passage: citationId ? { citationId, label: `DN 1 · ${citationId}` } : undefined,
  }
}

describe('notebook helpers', () => {
  it('writes the date the way the exports do', () => {
    expect(formatNoteDate(Date.UTC(2026, 10, 16))).toBe('2026-11-16')
  })

  it('counts how often each passage is used, the most used first', () => {
    const sources = getSourcesUsed([
      buildEntry('a', 1, '1.1'),
      buildEntry('b', 2, '1.2'),
      buildEntry('c', 3, '1.2'),
      buildEntry('d', 4),
    ])
    expect(sources.map((source) => [source.citationId, source.useCount])).toEqual([
      ['1.2', 2],
      ['1.1', 1],
    ])
  })

  it('puts the newest note first', () => {
    const sorted = sortNewestFirst([buildEntry('old', 1), buildEntry('new', 9)])
    expect(sorted.map((entry) => entry.id)).toEqual(['new', 'old'])
  })
})
