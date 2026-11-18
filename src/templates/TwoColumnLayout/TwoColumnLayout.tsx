import type { ReactNode } from 'react'
import { Surface } from '@ds/atoms/Surface'

type TwoColumnLayoutProps = {
  main: ReactNode
  aside: ReactNode
}

export function TwoColumnLayout({ main, aside }: TwoColumnLayoutProps) {
  return (
    <Surface className="gap-area lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <Surface className="content-start gap-page">{main}</Surface>
      <Surface as="aside" className="content-start gap-page">
        {aside}
      </Surface>
    </Surface>
  )
}
