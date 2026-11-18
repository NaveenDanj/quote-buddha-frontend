import type { ReactNode } from 'react'
import { Surface } from '@ds/atoms/Surface'

type CenteredHeroLayoutProps = {
  children: ReactNode
  // A line under the hero, for example a note about the answers.
  footer?: ReactNode
}

// Fills the space it is given. If the content is taller than the window, this part scrolls, not the page.
export function CenteredHeroLayout({ children, footer }: CenteredHeroLayoutProps) {
  return (
    <Surface className="min-h-0 grid-rows-[1fr_auto] overflow-y-auto">
      <Surface className="content-center">{children}</Surface>
      {footer ? <Surface className="px-(--gutter) pb-4 text-center">{footer}</Surface> : null}
    </Surface>
  )
}
