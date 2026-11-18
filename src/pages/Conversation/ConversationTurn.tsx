import type { FeedbackChoice, Turn } from '@domain'
import {
  AssistantMessage,
  type AssistantMessageActions,
} from '@components/organisms/AssistantMessage'
import { UserMessage } from '@components/organisms/UserMessage'
import { doNothingYet } from '@pages/doNothingYet'

type ConversationTurnProps = {
  turn: Turn
  actions: AssistantMessageActions
  feedbackChoice?: FeedbackChoice
}

export function ConversationTurn({ turn, actions, feedbackChoice }: ConversationTurnProps) {
  return (
    <>
      <UserMessage
        text={turn.question}
        currentVersion={1}
        versionCount={1}
        onEdit={doNothingYet}
        onPreviousVersion={doNothingYet}
        onNextVersion={doNothingYet}
      />
      <AssistantMessage
        question={turn.question}
        state={turn.state}
        actions={actions}
        feedbackChoice={feedbackChoice}
      />
    </>
  )
}
