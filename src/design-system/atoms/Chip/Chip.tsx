import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName
  isPressed?: boolean
}

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
