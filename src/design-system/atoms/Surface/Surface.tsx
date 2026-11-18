import clsx from 'clsx'
import type { HTMLAttributes, Ref } from 'react'

export const SurfaceLook = {
  plain: 'plain',
  subtle: 'subtle',
  dashed: 'dashed',
  framed: 'framed',
  outlined: 'outlined',
  inverse: 'inverse',
} as const
export type SurfaceLook = (typeof SurfaceLook)[keyof typeof SurfaceLook]

export const SurfaceSpace = {
  none: 'none',
  small: 'small',
  medium: 'medium',
  large: 'large',
} as const
export type SurfaceSpace = (typeof SurfaceSpace)[keyof typeof SurfaceSpace]

// How the rows share the height. Used when the Surface has a set height, for example the whole window.
// "fill" rows may shrink below their content, which is what lets an inner area scroll instead of stretching the page.
export const SurfaceRows = {
  fill: 'fill',
  headerThenFill: 'headerThenFill',
  fillThenFooter: 'fillThenFooter',
  headerThenFillThenFooter: 'headerThenFillThenFooter',
  contentThenFooter: 'contentThenFooter',
} as const
export type SurfaceRows = (typeof SurfaceRows)[keyof typeof SurfaceRows]

type SurfaceElement = 'div' | 'section' | 'article' | 'aside' | 'main'

const lookClass: Record<SurfaceLook, string> = {
  plain: '',
  subtle: 'rounded bg-surface-subtle forced-colors:border',
  dashed: 'rounded border border-dashed border-text-muted',
  framed: 'rounded border border-text-muted bg-page',
  outlined: 'rounded border border-text bg-page',
  inverse: 'rounded bg-inverse-bg text-inverse-text forced-colors:border',
}

const paddingClass: Record<SurfaceSpace, string> = {
  none: '',
  small: 'p-card-tight',
  medium: 'p-card',
  large: 'p-page',
}

const gapClass: Record<SurfaceSpace, string> = {
  none: '',
  small: 'gap-group',
  medium: 'gap-block',
  large: 'gap-section',
}

const rowsClass: Record<SurfaceRows, string> = {
  fill: 'grid-rows-[minmax(0,1fr)]',
  headerThenFill: 'grid-rows-[auto_minmax(0,1fr)]',
  fillThenFooter: 'grid-rows-[minmax(0,1fr)_auto]',
  headerThenFillThenFooter: 'grid-rows-[auto_minmax(0,1fr)_auto]',
  contentThenFooter: 'grid-rows-[1fr_auto]',
}

// A scroll area is the positioned parent of the visually hidden text inside it. That text is absolutely
// positioned, and without a positioned parent it escapes the clip and makes the whole page scroll.
const scrollAreaClass = 'relative min-h-0 overflow-y-auto'

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLDivElement>
  as?: SurfaceElement
  look?: SurfaceLook
  padding?: SurfaceSpace
  // The space between the things inside.
  gap?: SurfaceSpace
  rows?: SurfaceRows
  // This Surface scrolls its own content, so the page does not.
  isScrollArea?: boolean
}

// The box that holds a group of things: a grid with a look, padding and a gap. Use it instead of a styled div.
// Give a section or a group a name (aria-label or aria-labelledby) so screen readers can find it.
export function Surface({
  as: Element = 'div',
  look = SurfaceLook.plain,
  padding = SurfaceSpace.none,
  gap = SurfaceSpace.none,
  rows,
  isScrollArea = false,
  className,
  children,
  ...elementProps
}: SurfaceProps) {
  return (
    <Element
      className={clsx(
        'grid min-w-0 grid-cols-[minmax(0,1fr)]',
        lookClass[look],
        paddingClass[padding],
        gapClass[gap],
        rows ? rowsClass[rows] : '',
        isScrollArea ? scrollAreaClass : '',
        className,
      )}
      {...elementProps}
    >
      {children}
    </Element>
  )
}
