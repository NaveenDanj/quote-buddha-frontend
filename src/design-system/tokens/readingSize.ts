import { useEffect, useSyncExternalStore } from 'react'

export const ReadingSize = {
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const
export type ReadingSize = (typeof ReadingSize)[keyof typeof ReadingSize]

const scaleByReadingSize: Record<ReadingSize, number> = {
  small: 0.9,
  medium: 1,
  large: 1.15,
}

const storageKey = 'quote-buddha-reading-size'

export function toReadingSize(value: unknown): ReadingSize {
  return Object.values(ReadingSize).find((size) => size === value) ?? ReadingSize.medium
}

export function readSavedReadingSize(): ReadingSize {
  try {
    return toReadingSize(localStorage.getItem(storageKey))
  } catch {
    return ReadingSize.medium
  }
}

function saveReadingSize(size: ReadingSize) {
  try {
    localStorage.setItem(storageKey, size)
  } catch {}
}

export function applyReadingSize(size: ReadingSize) {
  document.documentElement.style.setProperty('--reading-scale', String(scaleByReadingSize[size]))
}

// One reading size for the whole app, so the Settings dialog and the Reader's text size button always agree.
let currentReadingSize: ReadingSize = readSavedReadingSize()
const listeners = new Set<() => void>()

function subscribeToReadingSize(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getReadingSize(): ReadingSize {
  return currentReadingSize
}

export function setReadingSize(size: ReadingSize) {
  currentReadingSize = size
  saveReadingSize(size)
  applyReadingSize(size)
  listeners.forEach((listener) => listener())
}

// Small, then medium, then large, then back to small.
export function getNextReadingSize(size: ReadingSize): ReadingSize {
  const sizes = Object.values(ReadingSize)
  const nextPosition = (sizes.indexOf(size) + 1) % sizes.length
  return sizes[nextPosition] ?? ReadingSize.medium
}

export function useReadingSize() {
  const readingSize = useSyncExternalStore(subscribeToReadingSize, getReadingSize)

  useEffect(() => {
    applyReadingSize(readingSize)
  }, [readingSize])

  return { readingSize, setReadingSize }
}
