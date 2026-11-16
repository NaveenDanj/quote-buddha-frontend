import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export const SurfaceLook = {
  plain: 'plain',
  subtle: 'subtle',
  dashed: 'dashed',
  framed: 'framed',
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

type SurfaceElement = 'div' | 'section' | 'article' | 'aside'

const lookClass: Record<SurfaceLook, string> = {
  plain: '',
  subtle: 'rounded bg-surface-subtle forced-colors:border',
  dashed: 'rounded border border-dashed border-text-muted',
  framed: 'rounded border border-text-muted bg-page',
  inverse: 'rounded bg-inverse-bg text-inverse-text forced-colors:border',
}

const paddingClass: Record<SurfaceSpace, string> = {
  none: '',
  small: 'p-3',
  medium: 'p-4',
  large: 'p-5',
}

const gapClass: Record<SurfaceSpace, string> = {
  none: '',
  small: 'gap-2',
  medium: 'gap-3',
  large: 'gap-4',
}

type SurfaceProps = HTMLAttributes<HTMLElement> & {
  as?: SurfaceElement
  look?: SurfaceLook
  padding?: SurfaceSpace
  // The space between the things inside.
  gap?: SurfaceSpace
}

// The box that holds a group of things: a grid with a look, padding and a gap. Use it instead of a styled div.
// Give a section or a group a name (aria-label or aria-labelledby) so screen readers can find it.
export function Surface({
  as: Element = 'div',
  look = SurfaceLook.plain,
  padding = SurfaceSpace.none,
  gap = SurfaceSpace.none,
  className,
  children,
  ...elementProps
}: SurfaceProps) {
  return (
    <Element
      className={clsx(
        'grid min-w-0',
        lookClass[look],
        paddingClass[padding],
        gapClass[gap],
        className,
      )}
      {...elementProps}
    >
      {children}
    </Element>
  )
}
