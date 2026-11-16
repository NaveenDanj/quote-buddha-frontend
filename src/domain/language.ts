export const TextLanguage = {
  pali: 'pi',
  sinhala: 'si',
  english: 'en',
} as const
export type TextLanguage = (typeof TextLanguage)[keyof typeof TextLanguage]
