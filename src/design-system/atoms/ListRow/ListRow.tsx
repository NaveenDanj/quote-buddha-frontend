import clsx from 'clsx'
import type { ReactNode } from 'react'

type ListRowBaseProps = {
  isSelected?: boolean
  trailing?: ReactNode
  children: ReactNode
}

type ListRowProps = ListRowBaseProps &
  ({ href: string; onClick?: never } | { onClick: () => void; href?: never })

const rowClass =
  'flex w-full items-center justify-between gap-3 border-0 bg-transparent px-3 py-3 text-left font-ui text-ui text-text no-underline ' +
  'transition-colors duration-(--motion-fast) enabled:hover:bg-surface-subtle'

export function ListRow({ isSelected = false, trailing, children, href, onClick }: ListRowProps) {
  const content = (
    <>
      <span className="min-w-0">{children}</span>
      {trailing}
    </>
  )
  const className = clsx(rowClass, isSelected && 'bg-surface-subtle')

  return (
    <li className="border-b border-border">
      {href !== undefined ? (
        <a href={href} aria-current={isSelected ? 'true' : undefined} className={className}>
          {content}
        </a>
      ) : (
        <button
          type="button"
          onClick={onClick}
          aria-current={isSelected ? 'true' : undefined}
          className={className}
        >
          {content}
        </button>
      )}
    </li>
  )
}
