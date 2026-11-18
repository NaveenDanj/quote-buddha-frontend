import { useEffect, useState } from 'react'

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
  } catch {

  }
}

export function applyReadingSize(size: ReadingSize) {
  document.documentElement.style.setProperty('--reading-scale', String(scaleByReadingSize[size]))
}

export function useReadingSize() {
  const [readingSize, setReadingSizeState] = useState<ReadingSize>(readSavedReadingSize)

  useEffect(() => {
    applyReadingSize(readingSize)
  }, [readingSize])

  function setReadingSize(size: ReadingSize) {
    setReadingSizeState(size)
    saveReadingSize(size)
  }

  return { readingSize, setReadingSize }
}
