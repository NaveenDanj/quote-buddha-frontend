import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import { getTextClass } from '@ds/atoms/Text'

type ListboxOptionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isHighlighted: boolean
}

export function ListboxOption({
  isHighlighted,
  className,
  type = 'button',
  children,
  ...buttonProps
}: ListboxOptionProps) {
  return (
    <button
      type={type}
      role="option"
      aria-selected={isHighlighted}
      tabIndex={-1}
      className={clsx(
        'flex w-full cursor-pointer items-center justify-between gap-4 border-y-0 border-r-0 border-l-2 px-4 py-3 text-left text-text',
        getTextClass('ui'),
        isHighlighted
          ? 'border-l-text bg-surface-subtle forced-colors:outline'
          : 'border-l-transparent bg-transparent',
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
