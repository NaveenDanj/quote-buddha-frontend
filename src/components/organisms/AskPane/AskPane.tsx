import { Text } from '@ds/atoms/Text'
import type { PassageQuestion } from '@domain'
import { wording } from '@wording'
import { SuggestionChips } from '@components/molecules/SuggestionChips'
import { AskTurn } from './AskTurn'

type AskPaneProps = {
  turns: PassageQuestion[]
  onChooseSuggestion: (question: string) => void
  onSaveAsNote: (questionId: string) => void
  onOpenPassage: (citationId: string) => void
}

const suggestedQuestions = [
  wording.suggestedQuestionMeaning,
  wording.suggestedQuestionTerms,
  wording.suggestedQuestionWhole,
]

// The Ask tab of the Reader: the questions asked about passages so far. Suggestions show until the first question.
export function AskPane({ turns, onChooseSuggestion, onSaveAsNote, onOpenPassage }: AskPaneProps) {
  return (
    <div className="grid content-start gap-page">
      {turns.length > 0 ? (
        <ul aria-label={wording.askThreadLabel} className="grid list-none gap-page">
          {turns.map((turn) => (
            <li key={turn.id}>
              <AskTurn turn={turn} onSaveAsNote={onSaveAsNote} onOpenPassage={onOpenPassage} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-group">
          <Text variant="small" isMuted>
            {wording.suggestedQuestionsLabel}
          </Text>
          <SuggestionChips
            label={wording.suggestedQuestionsLabel}
            suggestions={suggestedQuestions}
            onChoose={onChooseSuggestion}
          />
        </div>
      )}
    </div>
  )
}
