import { describe, expect, it } from 'vitest'
import { compareTerms, markTerms } from './compare'

describe('comparing two passages', () => {
  it('sorts the terms into shared and only in one', () => {
    const comparison = compareTerms(
      ['diṭṭhi', 'attā', 'sassata'],
      ['diṭṭhi', 'attā', 'ucchedavāda'],
    )
    expect(comparison.shared).toEqual(['diṭṭhi', 'attā'])
    expect(comparison.onlyInFirst).toEqual(['sassata'])
    expect(comparison.onlyInSecond).toEqual(['ucchedavāda'])
  })

  it('marks the terms inside a text', () => {
    const parts = markTerms('Pali for diṭṭhi and attā here.', ['diṭṭhi', 'attā'])
    expect(parts.filter((part) => part.isMarked).map((part) => part.text)).toEqual([
      'diṭṭhi',
      'attā',
    ])
    expect(parts.map((part) => part.text).join('')).toBe('Pali for diṭṭhi and attā here.')
  })

  it('leaves the text alone when there is nothing to mark', () => {
    expect(markTerms('Plain text', [])).toEqual([{ text: 'Plain text', isMarked: false }])
  })

  it('takes the longer term when two start the same way', () => {
    const parts = markTerms('sassatavāda', ['sassata', 'sassatavāda'])
    expect(parts).toEqual([{ text: 'sassatavāda', isMarked: true }])
  })
})
