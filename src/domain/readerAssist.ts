// The tabs of the pane beside the text.
export const ReaderTab = {
  notes: 'notes',
  clarify: 'clarify',
  ask: 'ask',
} as const
export type ReaderTab = (typeof ReaderTab)[keyof typeof ReaderTab]

// What can be done with a paragraph or with selected words. Each one opens its own tab.
export const ReaderAction = {
  note: 'note',
  clarify: 'clarify',
  ask: 'ask',
} as const
export type ReaderAction = (typeof ReaderAction)[keyof typeof ReaderAction]

export function toReaderTab(value: string): ReaderTab {
  if (value === ReaderTab.clarify) {
    return ReaderTab.clarify
  }
  if (value === ReaderTab.ask) {
    return ReaderTab.ask
  }
  return ReaderTab.notes
}

export function getTabForAction(action: ReaderAction): ReaderTab {
  return toReaderTab(action)
}

export type ClarifyRequest = {
  paragraphId: string
  citationId: string
  sectionNumber: number
  sectionTitle: string
}

export type Clarification = {
  plainMeaning: string
  keyTerms: { pali: string; gloss: string }[]
  inContext: string
  doesNotSay: string
  basedOnCitationId: string
  basedOnLabel: string
}

// The explanation as plain text, for copying and for saving as a note.
export function getClarificationText(clarification: Clarification): string {
  return [clarification.plainMeaning, clarification.inContext, clarification.doesNotSay].join(
    '\n\n',
  )
}

export type AskRequest = {
  question: string
  paragraphId: string
  citationId: string
}

export type PassageAnswer = {
  text: string
  citationId: string
  citationLabel: string
}

export type PassageQuestion = {
  id: string
  question: string
  paragraphId: string
  // Missing while the answer is still being written.
  answer?: PassageAnswer
}

export function getAnswerNoteText(question: PassageQuestion): string {
  return `Q: ${question.question}\nA: ${question.answer?.text ?? ''}`
}
