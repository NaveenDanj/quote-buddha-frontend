const maxChannelValue = 255
const darkChannelLimit = 0.03928
const darkChannelDivisor = 12.92
const brightChannelOffset = 0.055
const brightChannelDivisor = 1.055
const brightChannelPower = 2.4
const redWeight = 0.2126
const greenWeight = 0.7152
const blueWeight = 0.0722
const glareAllowance = 0.05

export type RgbColor = { red: number; green: number; blue: number }

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
  const fraction = channel / maxChannelValue
  if (fraction <= darkChannelLimit) {
    return fraction / darkChannelDivisor
  }
  return Math.pow((fraction + brightChannelOffset) / brightChannelDivisor, brightChannelPower)
}

function brightness(color: RgbColor): number {
  const red = channelBrightness(color.red)
  const green = channelBrightness(color.green)
  const blue = channelBrightness(color.blue)
  return redWeight * red + greenWeight * green + blueWeight * blue
}

export function contrastRatio(first: RgbColor, second: RgbColor): number {
  const firstBrightness = brightness(first)
  const secondBrightness = brightness(second)
  const lighter = Math.max(firstBrightness, secondBrightness)
  const darker = Math.min(firstBrightness, secondBrightness)
  return (lighter + glareAllowance) / (darker + glareAllowance)
}
