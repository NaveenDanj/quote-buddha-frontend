import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '../Icon'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName
  // For a chip that turns something on or off. Leave out for a chip that just does something.
  isPressed?: boolean
}

// The boundary uses the muted text color (not the hairline color) so the chip meets 3:1 against the page.
// In Windows high contrast mode colors are replaced, so a pressed chip gets a thicker border.
// A disabled chip has a dashed outline: it means "not available" (for example, not yet in the corpus).
export function Chip({
  icon,
  isPressed,
  className,
  type = 'button',
  children,
  ...buttonProps
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={isPressed}
      className={clsx(
        'inline-flex min-h-(--control-small) cursor-pointer items-center gap-2 rounded border px-3',
        'font-ui text-label font-medium whitespace-nowrap',
        'transition-colors duration-(--motion-fast)',
        'disabled:cursor-not-allowed disabled:border-dashed disabled:opacity-45',
        isPressed
          ? 'border-text bg-surface-subtle text-text forced-colors:border-2'
          : 'border-text-muted bg-transparent text-text-muted enabled:hover:border-text enabled:hover:text-text',
        className,
      )}
      {...buttonProps}
    >
      {icon ? <Icon name={icon} size="small" /> : null}
      {children}
    </button>
  )
}
