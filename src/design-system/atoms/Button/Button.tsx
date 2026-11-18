import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'medium' | 'small'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'border-text bg-text text-page enabled:hover:border-accent enabled:hover:bg-accent',
  secondary: 'border-text bg-transparent text-text enabled:hover:bg-text enabled:hover:text-page',
  text: 'border-transparent bg-transparent text-text underline decoration-1 underline-offset-4 enabled:hover:text-accent',
}

const sizeClass: Record<ButtonSize, string> = {
  medium: 'py-3 text-ui',
  small: 'py-2 text-label',
}

// The text button is a link-like word, so it has no side padding.
function getSidePaddingClass(variant: ButtonVariant, size: ButtonSize): string {
  if (variant === 'text') {
    return 'px-0'
  }
  if (size === 'small') {
    return 'px-3'
  }
  return 'px-(--button-padding-x)'
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: IconName
  // For a button that goes forward, such as a next arrow.
  trailingIcon?: IconName
}

export function Button({
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  className,
  type = 'button',
  children,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'inline-flex cursor-pointer items-center gap-2 rounded border font-ui font-medium leading-none',
        'transition-colors duration-(--motion-fast)',
        'disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
        variantClass[variant],
        sizeClass[size],
        getSidePaddingClass(variant, size),
        className,
      )}
      {...buttonProps}
    >
      {leadingIcon ? <Icon name={leadingIcon} size="small" /> : null}
      {children}
      {trailingIcon ? <Icon name={trailingIcon} size="small" /> : null}
    </button>
  )
}
