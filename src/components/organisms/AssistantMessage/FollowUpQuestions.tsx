import { wording } from '@wording'
import { SuggestionChips } from '@components/molecules/SuggestionChips'

type FollowUpQuestionsProps = {
  questions: string[]
  onChoose: (question: string) => void
}

export function FollowUpQuestions({ questions, onChoose }: FollowUpQuestionsProps) {
  if (questions.length === 0) {
    return null
  }
  return (
    <SuggestionChips
      label={wording.exampleQuestionsLabel}
      suggestions={questions}
      onChoose={onChoose}
    />
  )
}
