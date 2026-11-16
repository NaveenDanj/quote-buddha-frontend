import type { ReactNode } from 'react'

// Accent underline for the words that differ when two passages are compared.
export function Mark({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-transparent text-text underline decoration-accent decoration-2 underline-offset-4">
      {children}
    </mark>
  )
}
