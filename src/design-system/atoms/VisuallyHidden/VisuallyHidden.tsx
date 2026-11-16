import type { ReactNode } from 'react'

// Text for screen readers only. It stays in the page but takes no space.
export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>
}
