import { useId, type ReactNode } from 'react'
import { Skeleton } from '@ds/atoms/Skeleton'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import {
  countDirectQuotes,
  EvidenceState,
  StreamKind,
  type FeedbackChoice,
  type StreamState,
  type StreamStep,
} from '@domain'
import { answerReadyText, answerToText, wording } from '@wording'
import { EvidenceTag } from '@components/molecules/EvidenceTag'
import { StreamingSteps } from '@components/molecules/StreamingSteps'
import { AbstainedBody } from './AbstainedBody'
import { AnsweredBody } from './AnsweredBody'
import type { AssistantMessageActions } from './AssistantMessageActions'
import { MessageHeader } from './MessageHeader'

type AssistantMessageProps = {
  // The question this message answers. It names the message for screen readers.
  question: string
  state: StreamState
  actions: AssistantMessageActions
  feedbackChoice?: FeedbackChoice
  followUpQuestions?: string[]
}

function getLatestStepText(steps: StreamStep[]): string {
  const latestStep = steps.at(-1)
  return latestStep ? latestStep.text : ''
}

// What a screen reader is told as the answer moves from one stage to the next.
function getAnnouncement(state: StreamState): string {
  switch (state.kind) {
    case StreamKind.streaming:
      return getLatestStepText(state.steps)
    case StreamKind.answered:
      return answerReadyText(state.answer.claims.length)
    case StreamKind.abstained:
      return wording.noSupportedAnswerText
    case StreamKind.stopped:
      return wording.stoppedText
    default:
      return ''
  }
}

// "Found" is only said when at least one quote was really found. Otherwise the answer says what it is.
function getBadge(state: StreamState): ReactNode {
  if (state.kind === StreamKind.answered) {
    return countDirectQuotes(state.answer.claims) > 0 ? (
      <Tag glyph={TagGlyph.plain}>{wording.foundTag}</Tag>
    ) : (
      <EvidenceTag state={EvidenceState.notVerified} />
    )
  }
  return null
}

function StreamingBody({ steps }: { steps: StreamStep[] }) {
  return (
    <>
      <StreamingSteps steps={steps} isStreaming />
      {steps.length === 0 ? <Skeleton className="h-4 w-2/3" /> : null}
    </>
  )
}

type MessageBodyProps = Omit<AssistantMessageProps, 'question'>

function MessageBody({ state, actions, feedbackChoice, followUpQuestions = [] }: MessageBodyProps) {
  switch (state.kind) {
    case StreamKind.idle:
      return null
    case StreamKind.streaming:
      return <StreamingBody steps={state.steps} />
    case StreamKind.stopped:
      return (
        <>
          <StreamingSteps steps={state.steps} isStreaming={false} />
          <Text variant="caption" as="p" isMuted>
            {wording.stoppedText}
          </Text>
        </>
      )
    case StreamKind.failed:
      return (
        <>
          <StreamingSteps steps={state.steps} isStreaming={false} />
          <Text variant="ui" as="p" role="alert" className="text-danger">
            {wording.askFailedText}
          </Text>
        </>
      )
    case StreamKind.abstained:
      return (
        <AbstainedBody
          answer={state.answer}
          steps={state.steps}
          feedbackChoice={feedbackChoice}
          followUpQuestions={followUpQuestions}
          actions={actions}
        />
      )
    case StreamKind.answered:
      return (
        <AnsweredBody
          answer={state.answer}
          steps={state.steps}
          feedbackChoice={feedbackChoice}
          followUpQuestions={followUpQuestions}
          actions={actions}
        />
      )
  }
}

// One answer, in whatever stage it is: waiting, streaming, answered, abstained, stopped or failed.
// The article, its hidden heading and the status line stay in place while the stage changes, so
// screen readers hear each change.
export function AssistantMessage({ question, ...bodyProps }: AssistantMessageProps) {
  const headingId = useId()

  if (bodyProps.state.kind === StreamKind.idle) {
    return null
  }

  return (
    <Surface as="article" gap={SurfaceSpace.large} aria-labelledby={headingId}>
      <Text variant="ui" as="h2" id={headingId} className="sr-only">
        {answerToText(question)}
      </Text>
      <p role="status" className="sr-only">
        {getAnnouncement(bodyProps.state)}
      </p>
      <MessageHeader>{getBadge(bodyProps.state)}</MessageHeader>
      <MessageBody {...bodyProps} />
    </Surface>
  )
}
