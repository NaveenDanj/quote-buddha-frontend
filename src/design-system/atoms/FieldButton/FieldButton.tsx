import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { getTextClass } from '@ds/atoms/Text'

type FieldButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// Looks like a text field, but opens something else, such as the search. It is a button, so it says what it does.
export function FieldButton({
  className,
  type = 'button',
  children,
  ...buttonProps
}: FieldButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        'w-full cursor-pointer rounded border border-text-muted bg-page px-3 py-2 text-left text-text-muted hover:border-text',
        getTextClass('nav'),
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
