import { Chip } from '@ds/atoms/Chip'
import type { Answer, FeedbackChoice, StreamStep } from '@domain'
import { wording } from '@wording'
import { FeedbackActions } from '@components/molecules/FeedbackActions'
import { AbstainNotice } from '@components/organisms/AbstainNotice'
import type { AssistantMessageActions } from './AssistantMessageActions'
import { FollowUpQuestions } from './FollowUpQuestions'
import { ProcessSummary } from './ProcessSummary'
import { SourceRow } from './SourceRow'

type AbstainedActions = Pick<
  AssistantMessageActions,
  'onOpenSource' | 'onOpenGraph' | 'onShowCoverage' | 'onChooseFeedback' | 'onChooseQuestion'
>

type AbstainedBodyProps = {
  answer: Answer
  steps: StreamStep[]
  feedbackChoice?: FeedbackChoice
  followUpQuestions: string[]
  actions: AbstainedActions
}

export function AbstainedBody({
  answer,
  steps,
  feedbackChoice,
  followUpQuestions,
  actions,
}: AbstainedBodyProps) {
  return (
    <>
      <AbstainNotice answer={answer} />
      <SourceRow
        sources={answer.sources}
        onOpenSource={actions.onOpenSource}
        onOpenGraph={actions.onOpenGraph}
      />
      <ProcessSummary answer={answer} steps={steps} />
      <FeedbackActions choice={feedbackChoice} onChoose={actions.onChooseFeedback} />
      <div className="flex flex-wrap gap-2">
        <Chip icon="reader" onClick={actions.onShowCoverage}>
          {wording.browseIncludedLabel}
        </Chip>
      </div>
      <FollowUpQuestions questions={followUpQuestions} onChoose={actions.onChooseQuestion} />
    </>
  )
}
