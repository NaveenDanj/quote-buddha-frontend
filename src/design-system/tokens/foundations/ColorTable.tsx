import { contrastRatio, toHex } from './contrast'
import { readTokenColor, readTokenText } from './readToken'
import { useThemeChange } from './useThemeChange'

const colorTokens = [
  { name: '--color-page', use: 'Page background' },
  { name: '--color-surface-subtle', use: 'System explanation box, selected row, pressed chips' },
  { name: '--color-text', use: 'Body and headings' },
  { name: '--color-text-muted', use: 'Secondary text, input borders, glyph outlines' },
  { name: '--color-border', use: 'Hairlines and dividers (decorative, not a control boundary)' },
  { name: '--color-accent', use: 'Quotes, verified evidence path, footnote markers' },
  { name: '--color-danger', use: 'Real errors only, never abstention' },
  { name: '--color-focus', use: 'Focus ring' },
  { name: '--color-scrim', use: 'Behind dialogs' },
  { name: '--color-inverse-bg', use: 'Toast, selection toolbar' },
  { name: '--color-inverse-text', use: 'Text on inverse surfaces' },
]

// The scrim is see-through, so a contrast ratio and a hex value would be misleading.
const seeThroughNames = ['--color-scrim']

function formatRatio(name: string, backgroundName: string): string {
  if (seeThroughNames.includes(name)) {
    return 'n/a'
  }
  const color = readTokenColor(name)
  const background = readTokenColor(backgroundName)
  if (!color || !background) {
    return 'n/a'
  }
  return `${contrastRatio(color, background).toFixed(2)}:1`
}

function formatColor(name: string): string {
  const color = readTokenColor(name)
  if (!color || seeThroughNames.includes(name)) {
    return readTokenText(name)
  }
  return toHex(color)
}

// Every number here is read from the live variables, so it follows the Theme toolbar.
export function ColorTable() {
  useThemeChange()

  return (
    <div className="overflow-x-auto" role="region" aria-label="Color tokens" tabIndex={0}>
      <table className="w-full border-collapse text-ui text-left font-ui">
        <caption className="sr-only">Color tokens with live values and contrast</caption>
        <thead>
          <tr className="border-b border-border text-label text-text-muted">
            <th scope="col" className="p-2">
              Swatch
            </th>
            <th scope="col" className="p-2">
              Token
            </th>
            <th scope="col" className="p-2">
              Value now
            </th>
            <th scope="col" className="p-2">
              On page
            </th>
            <th scope="col" className="p-2">
              On subtle
            </th>
            <th scope="col" className="p-2">
              Use
            </th>
          </tr>
        </thead>
        <tbody>
          {colorTokens.map((token) => (
            <tr key={token.name} className="border-b border-border align-top">
              <td className="p-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-6 w-7 rounded border border-text-muted"
                  style={{ background: `var(${token.name})` }}
                />
              </td>
              <th scope="row" className="p-2 font-code text-code font-normal">
                {token.name}
              </th>
              <td className="p-2 font-code text-code">{formatColor(token.name)}</td>
              <td className="p-2 font-code text-code">{formatRatio(token.name, '--color-page')}</td>
              <td className="p-2 font-code text-code">
                {formatRatio(token.name, '--color-surface-subtle')}
              </td>
              <td className="p-2 text-text-muted">{token.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
