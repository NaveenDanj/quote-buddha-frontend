export type ComparableOption = {
  citationId: string
  label: string
}

export type ComparablePassage = ComparableOption & {
  paliText: string
  translationText: string
  // The Pali terms found in the passage.
  terms: string[]
}

export type MarkedPart = {
  text: string
  isMarked: boolean
}

export type TermComparison = {
  shared: string[]
  onlyInFirst: string[]
  onlyInSecond: string[]
}

export function compareTerms(firstTerms: string[], secondTerms: string[]): TermComparison {
  return {
    shared: firstTerms.filter((term) => secondTerms.includes(term)),
    onlyInFirst: firstTerms.filter((term) => !secondTerms.includes(term)),
    onlyInSecond: secondTerms.filter((term) => !firstTerms.includes(term)),
  }
}

function escapeForPattern(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Cuts the text into pieces, and marks the pieces that are one of the terms. Longer terms win over shorter ones.
export function markTerms(text: string, terms: string[]): MarkedPart[] {
  if (terms.length === 0) {
    return [{ text, isMarked: false }]
  }
  const longestFirst = [...terms].sort((first, second) => second.length - first.length)
  const pattern = new RegExp(`(${longestFirst.map(escapeForPattern).join('|')})`, 'g')

  return text
    .split(pattern)
    .filter((piece) => piece !== '')
    .map((piece) => ({ text: piece, isMarked: terms.includes(piece) }))
}
