import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Surface, SurfaceRows } from '@ds/atoms/Surface'

type ReaderLayoutProps = {
  toolbar: ReactNode
  // The list of sections. It shows beside the text on a wide window and is left out on a narrow one.
  outline: ReactNode
  isOutlineOpen: boolean
  // The notes and questions. It shows beside the text on a wide window and as a drawer on a narrow one.
  side: ReactNode
  isSideOpen: boolean
  // The question box along the bottom.
  askBar: ReactNode
  // Changing this puts the text back at the top, for example when the section changes.
  scrollResetKey: string
  children: ReactNode
}

function getColumnsClass(isOutlineOpen: boolean, isSideOpen: boolean): string {
  if (isOutlineOpen && isSideOpen) {
    return 'md:grid-cols-[var(--layout-reader-outline)_minmax(0,1fr)] lg:grid-cols-[var(--layout-reader-outline)_minmax(0,1fr)_var(--layout-reader-side)]'
  }
  if (isOutlineOpen) {
    return 'md:grid-cols-[var(--layout-reader-outline)_minmax(0,1fr)]'
  }
  if (isSideOpen) {
    return 'lg:grid-cols-[minmax(0,1fr)_var(--layout-reader-side)]'
  }
  return ''
}

const drawerClass =
  'max-lg:fixed max-lg:inset-y-0 max-lg:right-0 max-lg:z-(--z-panel) max-lg:w-full max-lg:max-w-(--layout-reader-side)'

// The toolbar stays on top. Under it the outline, the text and the side pane each scroll on their own, never the page.
export function ReaderLayout({
  toolbar,
  outline,
  isOutlineOpen,
  side,
  isSideOpen,
  askBar,
  scrollResetKey,
  children,
}: ReaderLayoutProps) {
  return (
    <Surface rows={SurfaceRows.headerThenFillThenFooter} className="h-full min-h-0">
      {toolbar}
      <div
        className={clsx(
          'grid min-h-0 grid-cols-[minmax(0,1fr)]',
          getColumnsClass(isOutlineOpen, isSideOpen),
        )}
      >
        {isOutlineOpen ? (
          <Surface
            isScrollArea
            className="content-start border-r border-border pt-card pr-card-tight pb-card pl-(--gutter) max-md:hidden"
          >
            {outline}
          </Surface>
        ) : null}
        <Surface
          key={scrollResetKey}
          isScrollArea
          className="content-start px-(--reader-text-gutter) pt-page pb-area"
        >
          {children}
        </Surface>
        {isSideOpen ? (
          <Surface className={clsx('min-h-0 border-l border-border bg-page', drawerClass)}>
            {side}
          </Surface>
        ) : null}
      </div>
      {askBar}
    </Surface>
  )
}
