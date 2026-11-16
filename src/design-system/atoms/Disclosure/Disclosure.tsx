import type { ReactNode } from 'react'
import { Icon } from '@ds/atoms/Icon'

type DisclosureProps = {
  summary: string
  isOpenAtStart?: boolean
  children: ReactNode
}

export function Disclosure({ summary, isOpenAtStart = false, children }: DisclosureProps) {
  return (
    <details open={isOpenAtStart} className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center py-3 justify-between gap-3 font-ui text-ui font-medium text-text [&::-webkit-details-marker]:hidden">
        {summary}
        <span className="group-open:rotate-180">
          <Icon name="expand" size="small" />
        </span>
      </summary>
      <div className="pt-3 font-ui text-ui text-text">{children}</div>
    </details>
  )
}
