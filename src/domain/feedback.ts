export const FeedbackChoice = {
  helpful: 'helpful',
  notHelpful: 'notHelpful',
} as const
export type FeedbackChoice = (typeof FeedbackChoice)[keyof typeof FeedbackChoice]
