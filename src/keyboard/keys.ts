export const Key = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
  tab: 'Tab',
  escape: 'Escape',
} as const
export type Key = (typeof Key)[keyof typeof Key]
