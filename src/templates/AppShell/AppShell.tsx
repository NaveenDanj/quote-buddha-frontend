import clsx from 'clsx'
import { useRef, type ReactNode } from 'react'
import { Link } from '@ds/atoms/Link'
import { Surface } from '@ds/atoms/Surface'
import { wording } from '@wording'
import { useDrawerFocus } from './useDrawerFocus'
import { useEscapeKey } from './useEscapeKey'

type AppShellProps = {
  rail: ReactNode
  topBar: ReactNode
  panel?: ReactNode
  isRailOpen: boolean
  onCloseRail: () => void
  onClosePanel: () => void
  children: ReactNode
}

const mainId = 'main'

const panelClass =
  'fixed inset-y-0 right-0 z-(--z-panel) grid-rows-[minmax(0,1fr)] w-full max-w-(--layout-panel) overflow-hidden border-l border-text bg-page lg:static lg:h-full lg:max-w-none'

function getRailClass(isRailOpen: boolean): string {
  return clsx(
    'fixed inset-y-0 left-0 z-(--z-panel) min-h-0 w-(--layout-rail) grid-rows-[minmax(0,1fr)] max-w-(--layout-drawer-max) bg-page',
    'transition-transform duration-(--motion-base)',
    'lg:visible lg:static lg:z-(--z-rail) lg:h-full lg:max-w-none lg:translate-x-0',
    isRailOpen ? 'visible translate-x-0' : 'invisible -translate-x-full',
  )
}

export function AppShell({
  rail,
  topBar,
  panel,
  isRailOpen,
  onCloseRail,
  onClosePanel,
  children,
}: AppShellProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  useDrawerFocus(isRailOpen, railRef)

  function closeTopmost() {
    if (isRailOpen) {
      onCloseRail()
    } else if (panel) {
      onClosePanel()
    }
  }
  useEscapeKey(shellRef, closeTopmost)

  return (
    <Surface
      ref={shellRef}
      className={clsx(
        'relative h-dvh grid-rows-[minmax(0,1fr)] overflow-hidden bg-page text-text',
        panel
          ? 'lg:grid-cols-[var(--layout-rail)_minmax(0,1fr)_var(--layout-panel)]'
          : 'lg:grid-cols-[var(--layout-rail)_minmax(0,1fr)]',
      )}
    >
      <Link
        href={`#${mainId}`}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-(--z-toast) focus:bg-page focus:p-2"
      >
        {wording.skipToMainLabel}
      </Link>
      {isRailOpen ? (
        <div
          aria-hidden="true"
          onClick={onCloseRail}
          className="fixed inset-0 z-(--z-panel) bg-scrim lg:hidden"
        />
      ) : null}
      <Surface ref={railRef} tabIndex={-1} className={getRailClass(isRailOpen)}>
        {rail}
      </Surface>
      <Surface className="min-h-0 grid-rows-[auto_minmax(0,1fr)]">
        {topBar}
        <main
          id={mainId}
          tabIndex={-1}
          className="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)] focus-visible:outline-0"
        >
          {children}
        </main>
      </Surface>
      {panel ? <Surface className={panelClass}>{panel}</Surface> : null}
    </Surface>
  )
}
