export type RgbColor = { red: number; green: number; blue: number }

// Reads the color text that getComputedStyle returns: three numbers, commas or spaces between them.
// Only the red-green-blue form is supported. The alpha number, if any, is ignored.
export function parseRgb(text: string): RgbColor | null {
  const numbers = text.match(/[\d.]+/g)
  if (!numbers || numbers.length < 3) {
    return null
  }
  const [red, green, blue] = numbers.map(Number)
  if (red === undefined || green === undefined || blue === undefined) {
    return null
  }
  return { red, green, blue }
}

function toHexPair(channel: number): string {
  return Math.round(channel).toString(16).padStart(2, '0')
}

export function toHex(color: RgbColor): string {
  const hex = `#${toHexPair(color.red)}${toHexPair(color.green)}${toHexPair(color.blue)}`
  return hex.toUpperCase()
}

function channelBrightness(channel: number): number {
  const fraction = channel / 255
  if (fraction <= 0.03928) {
    return fraction / 12.92
  }
  return Math.pow((fraction + 0.055) / 1.055, 2.4)
}

// WCAG relative luminance.
function brightness(color: RgbColor): number {
  const red = channelBrightness(color.red)
  const green = channelBrightness(color.green)
  const blue = channelBrightness(color.blue)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

// WCAG contrast ratio, from 1 (same) to 21 (black on white).
export function contrastRatio(first: RgbColor, second: RgbColor): number {
  const firstBrightness = brightness(first)
  const secondBrightness = brightness(second)
  const lighter = Math.max(firstBrightness, secondBrightness)
  const darker = Math.min(firstBrightness, secondBrightness)
  return (lighter + 0.05) / (darker + 0.05)
}
