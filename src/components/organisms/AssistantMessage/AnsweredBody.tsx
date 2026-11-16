import { Text } from '@ds/atoms/Text'
import type { Answer, FeedbackChoice, StreamStep } from '@domain'
import { wording } from '@wording'
import { ActionBar } from '@components/molecules/ActionBar'
import { FeedbackActions } from '@components/molecules/FeedbackActions'
import { SystemExplanation } from '@components/molecules/SystemExplanation'
import { ClaimList } from '@components/organisms/ClaimList'
import type { AssistantMessageActions } from './AssistantMessageActions'
import { FollowUpQuestions } from './FollowUpQuestions'
import { ProcessSummary } from './ProcessSummary'
import { SourceRow } from './SourceRow'

type AnsweredBodyProps = {
  answer: Answer
  steps: StreamStep[]
  feedbackChoice?: FeedbackChoice
  followUpQuestions: string[]
  actions: AssistantMessageActions
}

export function AnsweredBody({
  answer,
  steps,
  feedbackChoice,
  followUpQuestions,
  actions,
}: AnsweredBodyProps) {
  return (
    <>
      <ProcessSummary answer={answer} steps={steps} />
      {answer.simpleAnswer ? (
        <SystemExplanation heading={wording.simpleAnswerHeading} label={wording.simpleAnswerLabel}>
          {answer.simpleAnswer}
        </SystemExplanation>
      ) : null}
      <ClaimList
        claims={answer.claims}
        sources={answer.sources}
        onOpenSource={actions.onOpenSource}
      />
      <SourceRow
        sources={answer.sources}
        onOpenSource={actions.onOpenSource}
        onOpenGraph={actions.onOpenGraph}
      />
      <ActionBar
        label={wording.answerActionsLabel}
        actions={[
          { icon: 'copy', label: wording.copyAnswerLabel, onSelect: actions.onCopy },
          { icon: 'regenerate', label: wording.askAgainLabel, onSelect: actions.onAskAgain },
          { icon: 'saveToNotebook', label: wording.saveToNotebookLabel, onSelect: actions.onSave },
          {
            icon: 'evidenceMatrix',
            label: wording.evidenceMatrixLabel,
            onSelect: actions.onShowEvidence,
          },
          { icon: 'reader', label: wording.openInReaderLabel, onSelect: actions.onOpenReader },
        ]}
      />
      <FeedbackActions choice={feedbackChoice} onChoose={actions.onChooseFeedback} />
      <Text variant="caption" as="p" className="max-w-(--measure-reading) text-text-muted">
        {wording.scopeNote}
      </Text>
      <FollowUpQuestions questions={followUpQuestions} onChoose={actions.onChooseQuestion} />
    </>
  )
}
