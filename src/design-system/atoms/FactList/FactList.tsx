import type { ReactNode } from 'react'

export type Fact = {
  label: string
  value: ReactNode
}

export function FactList({ facts }: { facts: Fact[] }) {
  return (
    <dl className="m-0 grid grid-cols-1 gap-x-5 sm:grid-cols-[max-content_minmax(0,1fr)] gap-y-2 font-ui text-caption">
      {facts.map((fact) => (
        <div key={fact.label} className="contents">
          <dt className="text-text-muted">{fact.label}</dt>
          <dd className="m-0 min-w-0 wrap-anywhere text-text">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
