import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { evidenceStates } from '@domain'
import { attributedToBuddhaIn, backendWordingKeys, evidenceStateText, wording } from './wording'

const backendFilePath = join(
  process.cwd(),
  '..',
  'quote-buddha',
  'src',
  'quote_buddha',
  'answering',
  'wording.py',
)

// On a developer machine the backend repo may be missing. In CI it must be there, so the check cannot pass silently.
const isBackendFileMissing = !existsSync(backendFilePath)
const canSkipBackendCheck = isBackendFileMissing && !process.env['CI']

function toCamelCase(constantName: string): string {
  const parts = constantName.toLowerCase().split('_')
  const rest = parts.slice(1).map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  return [parts[0], ...rest].join('')
}

function readBackendWording(): Record<string, string> {
  const source = readFileSync(backendFilePath, 'utf8')
  const result: Record<string, string> = {}
  for (const block of source.split(/\n\s*\n/)) {
    const nameMatch = block.match(/^([A-Z_]+)\s*=/)
    if (!nameMatch?.[1]) {
      continue
    }
    const quotedParts = block.match(/"((?:[^"\\]|\\.)*)"/g) ?? []
    result[toCamelCase(nameMatch[1])] = quotedParts.map((part) => part.slice(1, -1)).join('')
  }
  return result
}

describe('wording that comes from the backend', () => {
  it.skipIf(canSkipBackendCheck)('is identical to the backend file', () => {
    const backend = readBackendWording()
    for (const key of backendWordingKeys) {
      expect(wording[key], key).toBe(backend[key])
    }
  })

  it.skipIf(canSkipBackendCheck)('covers every constant in the backend file', () => {
    const backendKeys = Object.keys(readBackendWording()).sort()
    expect([...backendWordingKeys].sort()).toEqual(backendKeys)
  })
})

describe('evidence wording', () => {
  it('has words for every evidence state', () => {
    for (const state of evidenceStates) {
      expect(evidenceStateText[state].length).toBeGreaterThan(0)
    }
  })

  it('never says the Buddha said or taught something', () => {
    for (const text of Object.values(wording)) {
      expect(text).not.toMatch(/the Buddha said|historical Buddha|Buddha (said|taught)\b/i)
    }
  })

  it('always says where "not found" was looked for', () => {
    const notFoundTexts = Object.values(wording).filter((text) => /not found/i.test(text))
    expect(notFoundTexts.length).toBeGreaterThan(0)
    for (const text of notFoundTexts) {
      expect(text).toMatch(/included (corpus|texts)/i)
    }
  })

  it('writes attribution in the approved form', () => {
    expect(attributedToBuddhaIn('DN 1')).toBe('attributed to the Buddha in DN 1')
  })
})
