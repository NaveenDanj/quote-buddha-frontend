import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

type IconButtonSize = 'small' | 'medium'

const sizeClass: Record<IconButtonSize, string> = {
  small: 'size-(--control-small)',
  medium: 'size-(--control-medium)',
}

type IconButtonProps = Omit<ComponentProps<'button'>, 'children' | 'aria-label'> & {
  icon: IconName
  label: string
  size?: IconButtonSize
  isSolid?: boolean
  isPressed?: boolean
}

function getLookClass(isSolid: boolean, isPressed: boolean | undefined): string {
  // if (isSolid) {
  //   return 'border-inverse-bg bg-inverse-bg text-inverse-text enabled:hover:border-accent enabled:hover:bg-accent'
  // }

  // if (isPressed) {
  //   return 'border-text bg-surface-subtle text-text forced-colors:border-2'
  // }

  // return 'border-transparent bg-transparent text-text enabled:hover:border-border enabled:hover:bg-surface-subtle'

  switch (true) {
    case isSolid:
      return 'border-inverse-bg bg-inverse-bg text-inverse-text enabled:hover:border-accent enabled:hover:bg-accent'
    case isPressed:
      return 'border-text bg-surface-subtle text-text forced-colors:border-2'
    default:
      return 'border-transparent bg-transparent text-text enabled:hover:border-border enabled:hover:bg-surface-subtle'
  }
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
        'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
        sizeClass[size],
        getLookClass(isSolid, isPressed),
        className,
      )}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}
