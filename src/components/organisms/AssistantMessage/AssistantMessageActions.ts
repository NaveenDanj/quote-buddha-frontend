import type { FeedbackChoice } from '@domain'

export type AssistantMessageActions = {
  onOpenSource: (citationId: string) => void
  onOpenGraph: () => void
  onShowEvidence: () => void
  onShowCoverage: () => void
  onCopy: () => void
  onAskAgain: () => void
  onSave: () => void
  onOpenReader: () => void
  onChooseFeedback: (choice: FeedbackChoice) => void
  onChooseQuestion: (question: string) => void
}
