import clsx from 'clsx'
import type { ComponentProps } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

export const IconButtonLook = {
  plain: 'plain',
  solid: 'solid',
  onInverse: 'onInverse',
} as const
export type IconButtonLook = (typeof IconButtonLook)[keyof typeof IconButtonLook]

type IconButtonSize = 'small' | 'medium'

const sizeClass: Record<IconButtonSize, string> = {
  small: 'size-(--control-small)',
  medium: 'size-(--control-medium)',
}

type IconButtonProps = Omit<ComponentProps<'button'>, 'children' | 'aria-label'> & {
  icon: IconName
  label: string
  size?: IconButtonSize
  look?: IconButtonLook
  isPressed?: boolean
}

// The focus ring is drawn inside on a dark surface, so it stays on the dark color and keeps its contrast.
function getLookClass(look: IconButtonLook, isPressed: boolean | undefined): string {
  switch (look) {
    case IconButtonLook.solid:
      return 'border-inverse-bg bg-inverse-bg text-inverse-text enabled:hover:border-accent enabled:hover:bg-accent'
    case IconButtonLook.onInverse:
      return 'border-transparent bg-transparent text-inverse-text enabled:hover:bg-inverse-text/20 [--color-focus:var(--color-inverse-focus)] focus-ring-inset'
    case IconButtonLook.plain:
      return isPressed
        ? 'border-text bg-surface-subtle text-text forced-colors:border-2'
        : 'border-transparent bg-transparent text-text enabled:hover:border-border enabled:hover:bg-surface-subtle'
  }
}

export function IconButton({
  icon,
  label,
  size = 'medium',
  look = IconButtonLook.plain,
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
        'relative inline-grid shrink-0 cursor-pointer place-items-center rounded border ',
        'transition-colors duration-(--motion-fast)',
        'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-(--opacity-disabled)',
        sizeClass[size],
        getLookClass(look, isPressed),
        className,
      )}
    >
      <Icon name={icon} size={size} />
    </button>
  )
}
