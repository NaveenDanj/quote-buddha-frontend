import clsx from 'clsx'
import { useRef, type ReactNode } from 'react'
import { Link } from '@ds/atoms/Link'
import { Surface, SurfaceRows } from '@ds/atoms/Surface'
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
  'fixed inset-y-0 right-0 z-(--z-panel) w-full max-w-(--layout-panel) overflow-hidden border-l border-text bg-page lg:static lg:h-full lg:max-w-none'

function getRailClass(isRailOpen: boolean): string {
  return clsx(
    'fixed inset-y-0 left-0 z-(--z-panel) min-h-0 w-(--layout-rail) max-w-(--layout-drawer-max) bg-page',
    'transition-transform duration-(--motion-base)',
    'lg:visible lg:static lg:z-(--z-rail) lg:h-full lg:max-w-none lg:translate-x-0',
    isRailOpen ? 'visible translate-x-0' : 'invisible -translate-x-full',
  )
}

function SkipToMainLink() {
  return (
    <Link
      href={`#${mainId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-(--z-toast) focus:bg-page focus:p-group"
    >
      {wording.skipToMainLabel}
    </Link>
  )
}

// A click anywhere outside the drawer closes it. It is not a control, so keyboard users close it with Escape.
function RailScrim({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-hidden="true"
      onClick={onClose}
      className="fixed inset-0 z-(--z-panel) bg-scrim lg:hidden"
    />
  )
}

type MainColumnProps = {
  topBar: ReactNode
  children: ReactNode
}

function MainColumn({ topBar, children }: MainColumnProps) {
  return (
    <Surface rows={SurfaceRows.headerThenFill} className="min-h-0">
      {topBar}
      <Surface
        as="main"
        id={mainId}
        tabIndex={-1}
        rows={SurfaceRows.fill}
        className="min-h-0 focus-visible:outline-0"
      >
        {children}
      </Surface>
    </Surface>
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
      rows={SurfaceRows.fill}
      className={clsx(
        'relative h-dvh overflow-hidden bg-page text-text',
        panel
          ? 'lg:grid-cols-[var(--layout-rail)_minmax(0,1fr)_var(--layout-panel)]'
          : 'lg:grid-cols-[var(--layout-rail)_minmax(0,1fr)]',
      )}
    >
      <SkipToMainLink />
      {isRailOpen ? <RailScrim onClose={onCloseRail} /> : null}
      <Surface
        ref={railRef}
        tabIndex={-1}
        rows={SurfaceRows.fill}
        className={getRailClass(isRailOpen)}
      >
        {rail}
      </Surface>
      <MainColumn topBar={topBar}>{children}</MainColumn>
      {panel ? (
        <Surface rows={SurfaceRows.fill} className={panelClass}>
          {panel}
        </Surface>
      ) : null}
    </Surface>
  )
}
