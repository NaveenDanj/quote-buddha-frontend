import {
  readdirSync,
  readFileSync,
  statSync
} from 'node:fs'
import {
  join
} from 'node:path'

const sourceFolder = 'src'
const builtFolder = join('dist', 'assets')

const allowedClasses = new Set(['group', 'peer', 'dark', 'light'])


const utilityPattern =
  /^(?:[a-z-]+:)*-?[a-z]+(?:-[a-z]+)*-(?:\d+(?:\.\d+)?|px|full|auto|screen|dvh|none|\[.+\]|\(.+\))$/

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

function readBuiltCss() {
  let cssFiles = []
  try {
    cssFiles = readdirSync(builtFolder).filter((name) => name.endsWith('.css'))
  } catch {
    // No build folder yet. The check below reports it.
  }
  if (cssFiles.length === 0) {
    console.error('No built CSS found. Run "npm run build" first.')
    process.exit(1)
  }
  return cssFiles.map((name) => readFileSync(join(builtFolder, name), 'utf8')).join('\n')
}

function toCssSelector(className) {
  return '.' + className.replace(/[^a-zA-Z0-9_-]/g, (character) => '\\' + character)
}

function escapeForRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function isInCss(css, className) {
  const pattern = new RegExp(escapeForRegex(toCssSelector(className)) + '(?![\\w\\\\-])')
  return pattern.test(css)
}

function findClassNames(text) {
  const classNames = new Set()
  for (const match of text.matchAll(/(["'`])((?:(?!\1)[^\\\n$])+)\1/g)) {
    for (const word of match[2].split(/\s+/)) {
      if (utilityPattern.test(word) && !allowedClasses.has(word)) {
        classNames.add(word)
      }
    }
  }
  return classNames
}

const css = readBuiltCss()
const missing = new Map()

for (const path of listFiles(sourceFolder)) {
  const isCode =
    path.endsWith('.tsx') && !path.endsWith('.stories.tsx') && !path.endsWith('.test.tsx')
  if (!isCode) continue
  for (const className of findClassNames(readFileSync(path, 'utf8'))) {
    if (!isInCss(css, className)) {
      missing.set(className, [...(missing.get(className) ?? []), path])
    }
  }
}

if (missing.size > 0) {
  console.error('These classes are used in the code but are not in the built CSS:\n')
  for (const [className, paths] of missing) {
    console.error(`  ${className}   (${[...new Set(paths)].slice(0, 3).join(', ')})`)
  }
  console.error(
    '\nThe value is probably not a token. Add it to src/design-system/tokens/tokens.css, or use one that exists.',
  )
  process.exit(1)
}

console.log('Class check passed: every utility class in the code exists in the built CSS.')