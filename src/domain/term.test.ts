import { describe, expect, it } from 'vitest'
import { filterTerms, getLargestOccurrenceCount, normalizeForSearch } from './term'

const terms = [
  { id: 'dittthi', pali: 'diṭṭhi' },
  { id: 'atta', pali: 'attā' },
  { id: 'phassa', pali: 'phassa' },
]

describe('term search', () => {
  it('ignores marks and capital letters', () => {
    expect(normalizeForSearch('Diṭṭhi')).toBe('ditthi')
  })

  it('finds a term without typing its marks', () => {
    expect(filterTerms(terms, 'ditth').map((term) => term.id)).toEqual(['dittthi'])
    expect(filterTerms(terms, 'ATTA').map((term) => term.id)).toEqual(['atta'])
  })

  it('shows every term for an empty search', () => {
    expect(filterTerms(terms, '  ')).toHaveLength(3)
  })

  it('finds the largest count, or zero for none', () => {
    expect(
      getLargestOccurrenceCount([
        { label: 'a', count: 3 },
        { label: 'b', count: 9 },
      ]),
    ).toBe(9)
    expect(getLargestOccurrenceCount([])).toBe(0)
  })
})
