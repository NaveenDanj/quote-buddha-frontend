import type { ReactNode } from 'react'

type StampProps = {
  // True for a keyboard key hint such as "Ctrl K". False for a small mono caption.
  isKey?: boolean
  children: ReactNode
}

export function Stamp({ isKey = false, children }: StampProps) {
  const className = 'font-code text-code text-text-muted'

  if (isKey) {
    return <kbd className={className}>{children}</kbd>
  }
  return <span className={className}>{children}</span>
}
