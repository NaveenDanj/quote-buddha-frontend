import type { ReactNode } from 'react'
import { Surface, SurfaceRows } from '@ds/atoms/Surface'

type CenteredHeroLayoutProps = {
  children: ReactNode
  footer?: ReactNode
}

export function CenteredHeroLayout({ children, footer }: CenteredHeroLayoutProps) {
  return (
    <Surface isScrollArea rows={SurfaceRows.contentThenFooter}>
      <Surface className="content-center">{children}</Surface>
      {footer ? <Surface className="px-(--gutter) pb-card text-center">{footer}</Surface> : null}
    </Surface>
  )
}
