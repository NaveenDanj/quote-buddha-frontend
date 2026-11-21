import type { ReactNode } from 'react'
import { Surface } from '@ds/atoms/Surface'

type ListDetailLayoutProps = {
  list: ReactNode
  detail: ReactNode
}

export function ListDetailLayout({ list, detail }: ListDetailLayoutProps) {
  return (
    <Surface className="gap-area md:grid-cols-[var(--layout-list-column)_minmax(0,1fr)]">
      <Surface className="content-start gap-group">{list}</Surface>
      <Surface as="article" className="content-start gap-page">
        {detail}
      </Surface>
    </Surface>
  )
}
