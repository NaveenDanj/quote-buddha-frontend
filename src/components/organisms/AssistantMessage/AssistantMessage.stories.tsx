import type { Meta, StoryObj } from '@storybook/react-vite'
import { FeedbackChoice, StreamKind, TextLanguage } from '@domain'
import { wording } from '@wording'
import {
  abstainedNotEnoughClaimsAnswer,
  abstainedWeakEvidenceAnswer,
  answeredDeepAnswer,
  answeredQuickAnswer,
  buildAnswer,
  buildClaim,
  buildSource,
  sampleStreamSteps,
} from '@api/fixtures'
import { AssistantMessage } from './AssistantMessage'
import type { AssistantMessageActions } from './AssistantMessageActions'

const noActions: AssistantMessageActions = {
  onOpenSource: () => {},
  onOpenGraph: () => {},
  onShowEvidence: () => {},
  onShowCoverage: () => {},
  onCopy: () => {},
  onAskAgain: () => {},
  onSave: () => {},
  onOpenReader: () => {},
  onChooseFeedback: () => {},
  onChooseQuestion: () => {},
}

const followUps = [
  `${wording.sampleMarker}: a follow-up question?`,
  `${wording.sampleMarker}: another follow-up question?`,
]

const meta = {
  title: 'Components/Organisms/AssistantMessage',
  component: AssistantMessage,
  tags: ['autodocs'],
  args: {
    question: `${wording.sampleMarker}: a question?`,
    state: { kind: StreamKind.idle },
    actions: noActions,
  },
} satisfies Meta<typeof AssistantMessage>

export default meta
type Story = StoryObj<typeof meta>

export const WaitingForTheFirstStep: Story = {
  args: { state: { kind: StreamKind.streaming, steps: [] } },
}

export const Streaming: Story = {
  args: { state: { kind: StreamKind.streaming, steps: sampleStreamSteps.slice(0, 2) } },
}

export const Answered: Story = {
  args: {
    state: { kind: StreamKind.answered, steps: sampleStreamSteps, answer: answeredQuickAnswer },
    followUpQuestions: followUps,
  },
}

export const AnsweredWithASimpleAnswer: Story = {
  args: {
    state: {
      kind: StreamKind.answered,
      steps: sampleStreamSteps,
      answer: {
        ...answeredQuickAnswer,
        simpleAnswer: `${wording.sampleMarker}: plain-language summary.`,
      },
    },
  },
}

export const AnsweredAndRatedHelpful: Story = {
  args: {
    state: { kind: StreamKind.answered, steps: sampleStreamSteps, answer: answeredQuickAnswer },
    feedbackChoice: FeedbackChoice.helpful,
  },
}

export const AnsweredDeep: Story = {
  args: {
    state: { kind: StreamKind.answered, steps: sampleStreamSteps, answer: answeredDeepAnswer },
  },
}

export const AnsweredWithNoVerifiedQuote: Story = {
  args: {
    state: {
      kind: StreamKind.answered,
      steps: sampleStreamSteps,
      answer: { ...answeredQuickAnswer, claims: answeredQuickAnswer.claims.slice(1) },
    },
  },
}

export const AnsweredWithNoSourcesUsed: Story = {
  args: {
    state: {
      kind: StreamKind.answered,
      steps: sampleStreamSteps,
      answer: buildAnswer({ sources: [buildSource({ used: false })], retrievedCount: 1 }),
    },
  },
}

export const AnsweredWithAPaliQuote: Story = {
  args: {
    state: {
      kind: StreamKind.answered,
      steps: sampleStreamSteps,
      answer: buildAnswer({
        claims: [buildClaim({ quoteEditionLanguage: TextLanguage.pali })],
        sources: [buildSource()],
        retrievedCount: 1,
      }),
    },
  },
}

export const AbstainedWeakEvidence: Story = {
  args: {
    state: {
      kind: StreamKind.abstained,
      steps: sampleStreamSteps,
      answer: abstainedWeakEvidenceAnswer,
    },
    followUpQuestions: followUps,
  },
}

export const AbstainedNotEnoughClaims: Story = {
  args: {
    state: {
      kind: StreamKind.abstained,
      steps: sampleStreamSteps,
      answer: abstainedNotEnoughClaimsAnswer,
    },
  },
}

export const AbstainedWithoutAReason: Story = {
  args: {
    state: {
      kind: StreamKind.abstained,
      steps: sampleStreamSteps,
      answer: { ...abstainedWeakEvidenceAnswer, abstentionReason: null },
    },
  },
}

export const Stopped: Story = {
  args: { state: { kind: StreamKind.stopped, steps: sampleStreamSteps.slice(0, 2) } },
}

export const Failed: Story = {
  args: {
    state: {
      kind: StreamKind.failed,
      steps: sampleStreamSteps.slice(0, 1),
      error: { code: 'sample_error', message: wording.askFailedText },
    },
  },
}
