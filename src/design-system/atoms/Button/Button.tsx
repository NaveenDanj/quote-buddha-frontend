import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '../Icon'

type ButtonVariant = 'primary' | 'secondary' | 'text'
type ButtonSize = 'medium' | 'small'

const variantClass: Record<ButtonVariant, string> = {
  primary: 'border-text bg-text text-page hover:border-accent hover:bg-accent',
  secondary: 'border-text bg-transparent text-text hover:bg-text hover:text-page',
  text: 'border-transparent bg-transparent text-text underline decoration-1 underline-offset-4 hover:text-accent',
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
  return 'px-5'
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: IconName
}

export function Button({
  variant = 'primary',
  size = 'medium',
  leadingIcon,
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
        'disabled:cursor-not-allowed disabled:opacity-35',
        variantClass[variant],
        sizeClass[size],
        getSidePaddingClass(variant, size),
        className,
      )}
      {...buttonProps}
    >
      {leadingIcon ? <Icon name={leadingIcon} size="small" /> : null}
      {children}
    </button>
  )
}
