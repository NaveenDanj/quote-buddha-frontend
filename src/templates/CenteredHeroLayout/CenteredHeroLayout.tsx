import type { ReactNode } from 'react'
import { Surface, SurfaceRows } from '@ds/atoms/Surface'

type CenteredHeroLayoutProps = {
  children: ReactNode
  // A line under the hero, for example a note about the answers.
  footer?: ReactNode
}

// Fills the space it is given. If the content is taller than the window, this part scrolls, not the page.
export function CenteredHeroLayout({ children, footer }: CenteredHeroLayoutProps) {
  return (
    <Surface isScrollArea rows={SurfaceRows.contentThenFooter}>
      <Surface className="content-center">{children}</Surface>
      {footer ? <Surface className="px-(--gutter) pb-card text-center">{footer}</Surface> : null}
    </Surface>
  )
}
