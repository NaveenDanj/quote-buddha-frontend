import { parseRgb, type RgbColor } from './contrast'

// The value of a CSS variable exactly as written in the token files.
export function readTokenText(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}

// The real color a variable resolves to right now. The browser does the work, so light and dark both work.
export function readTokenColor(name: string): RgbColor | null {
  const probe = document.createElement('span')
  probe.style.color = `var(${name})`
  document.body.appendChild(probe)
  const resolved = getComputedStyle(probe).color
  probe.remove()
  return parseRgb(resolved)
}
