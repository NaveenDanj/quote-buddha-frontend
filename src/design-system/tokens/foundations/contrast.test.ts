import { describe, expect, it } from 'vitest'
import { contrastRatio, parseRgb, toHex } from './contrast'

function ratioOf(firstText: string, secondText: string): string {
  const first = parseRgb(firstText)
  const second = parseRgb(secondText)
  if (!first || !second) {
    throw new Error('Could not read the colors')
  }
  return contrastRatio(first, second).toFixed(2)
}

describe('contrast', () => {
  it('gives 21 for black on white', () => {
    expect(ratioOf('rgb(0, 0, 0)', 'rgb(255, 255, 255)')).toBe('21.00')
  })

  it('matches the numbers measured in brand.md (light)', () => {
    expect(ratioOf('rgb(17, 17, 17)', 'rgb(255, 255, 255)')).toBe('18.88')
    expect(ratioOf('rgb(94, 94, 94)', 'rgb(255, 255, 255)')).toBe('6.48')
    expect(ratioOf('rgb(168, 72, 10)', 'rgb(255, 255, 255)')).toBe('5.84')
  })

  it('reads space separated and alpha colors', () => {
    expect(parseRgb('rgb(0 0 0 / 0.5)')).toEqual({ red: 0, green: 0, blue: 0 })
    expect(parseRgb('not a color')).toBeNull()
  })

  it('writes hex', () => {
    expect(toHex({ red: 168, green: 72, blue: 10 })).toBe('#A8480A')
  })
})
