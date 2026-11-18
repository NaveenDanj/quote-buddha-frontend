import type { ReactNode } from 'react'
import { wording } from '@wording'

export function MessageHeader({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-block font-ui text-caption text-text-muted">
      <b className="font-semibold text-text">{wording.productName}</b>
      {children}
    </div>
  )
}
