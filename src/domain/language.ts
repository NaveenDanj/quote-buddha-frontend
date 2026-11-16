export const TextLanguage = {
  pali: 'pi',
  sinhala: 'si',
  english: 'en',
  // The standard code for "language not known". A screen reader then does not guess.
  unknown: 'und',
} as const
export type TextLanguage = (typeof TextLanguage)[keyof typeof TextLanguage]
