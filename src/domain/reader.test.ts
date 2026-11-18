import { describe, expect, it } from 'vitest'
import { ReadingView, clampSectionIndex, getSuttaLabel, toReadingView } from './reader'

describe('reader helpers', () => {
  it('keeps the section number inside the sutta', () => {
    expect(clampSectionIndex(-1, 7)).toBe(0)
    expect(clampSectionIndex(3, 7)).toBe(3)
    expect(clampSectionIndex(7, 7)).toBe(6)
  })

  it('falls back to both languages for an unknown view', () => {
    expect(toReadingView('translation')).toBe(ReadingView.translation)
    expect(toReadingView('anything else')).toBe(ReadingView.both)
  })

  it('names a sutta by its reference and title', () => {
    expect(getSuttaLabel({ id: 'dn-1', workRef: 'DN 1', title: 'Sample', isIncluded: true })).toBe(
      'DN 1 · Sample',
    )
  })
})
