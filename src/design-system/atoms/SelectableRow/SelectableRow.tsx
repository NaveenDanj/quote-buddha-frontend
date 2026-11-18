import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type SelectableRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isCurrent?: boolean
}

export function SelectableRow({
  isCurrent = false,
  className,
  type = 'button',
  children,
  ...buttonProps
}: SelectableRowProps) {
  return (
    <button
      type={type}
      aria-current={isCurrent ? 'page' : undefined}
      className={clsx(
        'flex w-full cursor-pointer items-center gap-3 border-y-0 border-r-0 border-l-2 bg-transparent py-(--nav-row-padding-y) pr-0 pl-3 text-left font-ui text-nav',
        'transition-colors duration-(--motion-fast)',
        isCurrent
          ? 'border-l-text font-medium text-text forced-colors:border-l-4'
          : 'border-l-transparent text-text-muted hover:text-text',
        className,
      )}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
