import { describe, expect, it } from 'vitest'
import { ReadingSize, getNextReadingSize } from './readingSize'

describe('getNextReadingSize', () => {
  it('goes small, medium, large and then back to small', () => {
    expect(getNextReadingSize(ReadingSize.small)).toBe(ReadingSize.medium)
    expect(getNextReadingSize(ReadingSize.medium)).toBe(ReadingSize.large)
    expect(getNextReadingSize(ReadingSize.large)).toBe(ReadingSize.small)
  })
})
