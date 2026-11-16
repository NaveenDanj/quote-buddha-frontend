import clsx from 'clsx'
import type { AnchorHTMLAttributes } from 'react'

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

// A plain underlined link. Router links are built on top of this in the app.
export function Link({ className, children, ...anchorProps }: LinkProps) {
  return (
    <a
      className={clsx(
        'text-text underline decoration-1 underline-offset-4 hover:text-accent',
        'transition-colors duration-(--motion-fast)',
        className,
      )}
      {...anchorProps}
    >
      {children}
    </a>
  )
}
