import type { AnswerDepth } from '@domain'

export const AskScope = {
  earlyTexts: 'early_texts',
} as const
export type AskScope = (typeof AskScope)[keyof typeof AskScope]

export const ReaderLevel = {
  general: 'general',
  researcher: 'researcher',
} as const
export type ReaderLevel = (typeof ReaderLevel)[keyof typeof ReaderLevel]

export type AskRequest = {
  question: string
  depth: AnswerDepth
  scope: AskScope
  chatId?: string
  // The passage the question is about, when asked from the Reader.
  context?: { citationId: string; selectedText?: string }
  readerLevel?: ReaderLevel
  language?: 'en'
}
