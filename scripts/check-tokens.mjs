// Fails when raw design values appear outside the token CSS files.
// Colors, sizes and z-index numbers must come from tokens (see .claude/skills/design-tokens).
// To allow one line on purpose, add the text "token-check-ignore" on that line.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const sourceFolder = 'src'
// Only the two token CSS files may hold raw values. The docs pages next to them are checked too.
const tokenFiles = [
  join('src', 'design-system', 'tokens', 'primitives.css'),
  join('src', 'design-system', 'tokens', 'tokens.css'),
]
const checkedEndings = ['.ts', '.tsx', '.css', '.mdx']
const skippedEndings = ['.test.ts', '.test.tsx', '.d.ts']

const rules = [
  { name: 'hex color', pattern: /#[0-9a-fA-F]{3,8}\b/ },
  { name: 'rgb or hsl color', pattern: /\b(?:rgba?|hsla?)\(/ },
  { name: 'raw px or rem size', pattern: /\b\d*\.?\d+(?:px|rem)\b/ },
  { name: 'numeric z-index', pattern: /z-?index['"]?\s*[:=]\s*\d+/i },
]

function listFiles(folder) {
  const files = []
  for (const name of readdirSync(folder)) {
    const path = join(folder, name)
    if (statSync(path).isDirectory()) {
      files.push(...listFiles(path))
    } else {
      files.push(path)
    }
  }
  return files
}

function shouldCheck(path) {
  if (tokenFiles.includes(path)) return false
  if (skippedEndings.some((ending) => path.endsWith(ending))) return false
  return checkedEndings.some((ending) => path.endsWith(ending))
}

function findProblems(path) {
  const problems = []
  const lines = readFileSync(path, 'utf8').split('\n')
  lines.forEach((line, index) => {
    if (line.includes('token-check-ignore')) return
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        problems.push(`${path}:${index + 1}  ${rule.name}: ${line.trim()}`)
      }
    }
  })
  return problems
}

const problems = listFiles(sourceFolder).filter(shouldCheck).flatMap(findProblems)

if (problems.length > 0) {
  console.error('Raw design values found outside the two token CSS files:\n')
  console.error(problems.join('\n'))
  console.error('\nUse a token instead (docs/references/brand.md).')
  process.exit(1)
}

console.log(
  'Token check passed: no raw colors, sizes or z-index numbers outside the token CSS files.',
)
