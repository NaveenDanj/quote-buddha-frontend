import type { ReactNode } from 'react'
import { Surface } from '@ds/atoms/Surface'

type ToolPageLayoutProps = {
  children: ReactNode
}

// The page of a research tool: a column on the left, scrolling inside the window, never the page.
export function ToolPageLayout({ children }: ToolPageLayoutProps) {
  return (
    <Surface isScrollArea>
      <Surface className="max-w-(--layout-hero-column) content-start gap-area px-(--gutter) pt-area pb-page-end">
        {children}
      </Surface>
    </Surface>
  )
}
