import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { getTextClass, type TextVariant, type TextWeight } from '@ds/atoms/Text'

type LinkButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  textVariant?: TextVariant
  weight?: TextWeight
  isUnderlined?: boolean
  isAccent?: boolean
}

export function LinkButton({
  textVariant = 'ui',
  weight,
  isUnderlined = true,
  isAccent = false,
  className,
  type = 'button',
  children,
  ...buttonProps
}: LinkButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'relative cursor-pointer border-0 bg-transparent p-0 text-left transition-colors duration-(--motion-fast)',
        "before:absolute before:inset-x-0 before:-inset-y-2 before:content-['']",
        getTextClass(textVariant, weight),
        isAccent ? 'text-accent hover:underline' : 'text-text hover:text-accent',
        isUnderlined && 'underline decoration-1 underline-offset-4',
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
