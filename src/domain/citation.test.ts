import { describe, expect, it } from 'vitest'
import { buildSource } from '@api/fixtures'
import { TextLanguage } from './language'
import { findSource, getCitationLabel, getSourceNumber, toTextLanguage } from './citation'

const firstSource = buildSource({ citationId: 'sample:1' })
const secondSource = buildSource({
  citationId: 'sample:2',
  location: { collection: 'Sample', nikaya: 'Sample', work: 'Sample work', section: '44.5' },
})

describe('getCitationLabel', () => {
  it('writes the work and the section when there is one', () => {
    expect(getCitationLabel(secondSource)).toBe('Sample work · 44.5')
  })

  it('writes only the work when the section is not known', () => {
    expect(getCitationLabel(firstSource)).toBe('Sample work')
  })
})

describe('finding a source', () => {
  it('finds a source by its citation id', () => {
    expect(findSource([firstSource, secondSource], 'sample:2')).toBe(secondSource)
    expect(findSource([firstSource], 'sample:2')).toBeUndefined()
  })

  it('numbers sources from 1, and has no number for an unknown source', () => {
    expect(getSourceNumber([firstSource, secondSource], 'sample:2')).toBe(2)
    expect(getSourceNumber([firstSource], 'sample:9')).toBeUndefined()
  })
})

describe('toTextLanguage', () => {
  it('knows Pali, Sinhala and English, and does not guess for anything else', () => {
    expect(toTextLanguage('pi')).toBe(TextLanguage.pali)
    expect(toTextLanguage('si')).toBe(TextLanguage.sinhala)
    expect(toTextLanguage('en')).toBe(TextLanguage.english)
    expect(toTextLanguage('anything else')).toBe(TextLanguage.unknown)
  })
})
