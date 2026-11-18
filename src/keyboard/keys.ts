export const Key = {
  arrowDown: 'ArrowDown',
  arrowUp: 'ArrowUp',
  enter: 'Enter',
  tab: 'Tab',
  escape: 'Escape',
  letterK: 'k',
} as const
export type Key = (typeof Key)[keyof typeof Key]
