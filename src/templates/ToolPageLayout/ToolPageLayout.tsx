import type { ReactNode } from 'react'
import { Surface } from '@ds/atoms/Surface'

export const ToolPageWidth = {
  narrow: 'narrow',
  wide: 'wide',
} as const
export type ToolPageWidth = (typeof ToolPageWidth)[keyof typeof ToolPageWidth]

const widthClass: Record<ToolPageWidth, string> = {
  narrow: 'max-w-(--layout-tool-narrow)',
  wide: 'max-w-(--layout-hero-column)',
}

type ToolPageLayoutProps = {
  width?: ToolPageWidth
  children: ReactNode
}

// The page of a research tool: a column on the left, scrolling inside the window, never the page.
export function ToolPageLayout({ width = ToolPageWidth.wide, children }: ToolPageLayoutProps) {
  return (
    <Surface isScrollArea>
      <Surface
        className={`${widthClass[width]} content-start gap-area px-(--gutter) pt-area pb-page-end`}
      >
        {children}
      </Surface>
    </Surface>
  )
}
