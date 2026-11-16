import { compile } from 'tailwindcss'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const tokensPath = join(process.cwd(), 'src', 'design-system', 'tokens', 'tokens.css')
const tokensText = readFileSync(tokensPath, 'utf8')

// The tokens file imports the palette. The compiler here does not follow imports, so leave that line out.
const tokensWithoutImport = tokensText.replace(/@import[^;]*;/, '')

async function buildClasses(classNames: string[]): Promise<string> {
  const compiler = await compile(`@tailwind utilities;\n${tokensWithoutImport}`)
  return compiler.build(classNames)
}

describe('Tailwind only knows the design tokens', () => {
  it('builds classes that come from tokens', async () => {
    const css = await buildClasses(['bg-page', 'text-text-muted', 'p-5', 'rounded', 'font-medium'])
    expect(css).toContain('.bg-page')
    expect(css).toContain('.text-text-muted')
    expect(css).toContain('.p-5')
    expect(css).toContain('.rounded')
    expect(css).toContain('.font-medium')
  })

  it('does not build classes from Tailwind defaults', async () => {
    const css = await buildClasses([
      'bg-red-500',
      'shadow-md',
      'font-bold',
      'animate-spin',
      'max-w-xl',
      'p-5.5',
    ])
    expect(css).not.toContain('.bg-red-500')
    expect(css).not.toContain('.shadow-md')
    expect(css).not.toContain('.font-bold')
    expect(css).not.toContain('.animate-spin')
    expect(css).not.toContain('.max-w-xl')
  })
})

function findColorNames(cssBlock: string): string[] {
  const matches = cssBlock.match(/--color-[a-z-]+(?=:)/g)
  return matches ? [...matches].sort() : []
}

function findBlock(startText: string): string {
  const start = tokensText.indexOf(startText)
  const end = tokensText.indexOf('\n}', start)
  return tokensText.slice(start, end)
}

describe('dark theme', () => {
  it('changes the same colors whether it follows the system or is chosen', () => {
    const followsSystem = findColorNames(findBlock(":root:not([data-theme='light']) {"))
    const chosen = findColorNames(findBlock(":root[data-theme='dark'] {"))
    expect(followsSystem.length).toBeGreaterThan(0)
    expect(followsSystem).toEqual(chosen)
  })
})
