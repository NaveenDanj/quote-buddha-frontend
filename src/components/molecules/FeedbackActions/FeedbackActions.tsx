import { FeedbackChoice } from '@domain'
import { wording } from '@wording'
import { ActionBar } from '@components/molecules/ActionBar'

type FeedbackActionsProps = {
  choice?: FeedbackChoice
  onChoose: (choice: FeedbackChoice) => void
}

export function FeedbackActions({ choice, onChoose }: FeedbackActionsProps) {
  return (
    <ActionBar
      label={wording.feedbackLabel}
      actions={[
        {
          icon: 'helpful',
          label: wording.helpfulLabel,
          isPressed: choice === FeedbackChoice.helpful,
          onSelect: () => onChoose(FeedbackChoice.helpful),
        },
        {
          icon: 'notHelpful',
          label: wording.notHelpfulLabel,
          isPressed: choice === FeedbackChoice.notHelpful,
          onSelect: () => onChoose(FeedbackChoice.notHelpful),
        },
      ]}
    />
  )
}
