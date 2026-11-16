import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName
  isPressed?: boolean
  // For long text such as a suggested question: the chip grows taller instead of running off the screen.
  canWrap?: boolean
  // Says why the chip cannot be used right now. The words are shown, and the chip does nothing when clicked.
  unavailableReason?: string
}

function getLookClass(isUnavailable: boolean, isPressed: boolean | undefined): string {
  if (isUnavailable) {
    return 'cursor-not-allowed border-dashed border-text-muted bg-transparent text-text-muted'
  }
  if (isPressed) {
    return 'cursor-pointer border-text bg-surface-subtle text-text forced-colors:border-2'
  }
  return 'cursor-pointer border-text-muted bg-transparent text-text-muted enabled:hover:border-text enabled:hover:text-text'
}

export function Chip({
  icon,
  isPressed,
  canWrap = false,
  unavailableReason,
  className,
  type = 'button',
  onClick,
  children,
  ...buttonProps
}: ChipProps) {
  const isUnavailable = unavailableReason !== undefined

  // aria-disabled instead of disabled: the chip stays reachable by keyboard, so its reason can be read.
  return (
    <button
      type={type}
      aria-pressed={isPressed}
      aria-disabled={isUnavailable ? true : undefined}
      onClick={isUnavailable ? undefined : onClick}
      className={clsx(
        'inline-flex min-h-(--control-small) items-center gap-2 rounded border px-3',
        'font-ui text-label font-medium',
        canWrap ? 'h-auto py-2 text-left whitespace-normal' : 'whitespace-nowrap',
        'transition-colors duration-(--motion-fast)',
        'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
        getLookClass(isUnavailable, isPressed),
        className,
      )}
      {...buttonProps}
    >
      {icon ? <Icon name={icon} size="small" /> : null}
      {children}
      {isUnavailable ? (
        <>
          {' '}
          <span className="font-normal">{unavailableReason}</span>
        </>
      ) : null}
    </button>
  )
}
