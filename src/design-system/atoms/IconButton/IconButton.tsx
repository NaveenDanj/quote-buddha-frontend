import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

type IconButtonSize = 'small' | 'medium'

const sizeClass: Record<IconButtonSize, string> = {
  small: 'size-(--control-small)',
  medium: 'size-(--control-medium)',
}

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> & {
  icon: IconName
  // There is no visible text and no tooltip, so the label is the button's only name. It is required.
  label: string
  size?: IconButtonSize
  // The filled, dark version for the one main action in a row (for example Send).
  isSolid?: boolean
  // For toggles. Leave out when the button is not a toggle.
  isPressed?: boolean
}

function getLookClass(isSolid: boolean, isPressed: boolean | undefined): string {
  if (isSolid) {
    return 'border-inverse-bg bg-inverse-bg text-inverse-text enabled:hover:border-accent enabled:hover:bg-accent'
  }
  if (isPressed) {
    // In Windows high contrast mode colors are replaced, so a pressed button gets a thicker border.
    return 'border-text bg-surface-subtle text-text forced-colors:border-2'
  }
  return 'border-transparent bg-transparent text-text enabled:hover:border-border enabled:hover:bg-surface-subtle'
}

export function IconButton({
  icon,
  label,
  size = 'medium',
  isSolid = false,
  isPressed,
  className,
  type = 'button',
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      aria-label={label}
      aria-pressed={isPressed}
      className={clsx(
        'relative inline-grid shrink-0 cursor-pointer place-items-center rounded border p-0',
        'transition-colors duration-(--motion-fast)',
        'disabled:cursor-not-allowed disabled:opacity-35',
        sizeClass[size],
        getLookClass(isSolid, isPressed),
        className,
      )}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}
