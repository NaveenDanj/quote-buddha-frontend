import clsx from 'clsx'
import type { ElementType, HTMLAttributes } from 'react'

export type TextVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'reading'
  | 'readingLarge'
  | 'pali'
  | 'ui'
  | 'label'
  | 'groupLabel'
  | 'caption'
  | 'code'

const variantClass: Record<TextVariant, string> = {
  display: 'font-reading text-display font-normal',
  heading1: 'font-reading text-heading-1 font-normal',
  heading2: 'font-reading text-heading-2 font-medium',
  heading3: 'font-reading text-heading-3 font-medium',
  reading: 'font-reading text-reading',
  readingLarge: 'font-reading text-reading-large',
  pali: 'font-reading text-pali',
  ui: 'font-ui text-ui',
  label: 'font-ui text-label font-semibold',
  groupLabel: 'font-ui text-stamp font-semibold uppercase tracking-[0.04em]',
  caption: 'font-ui text-caption',
  code: 'font-code text-code',
}

// The element each variant uses unless the page needs a different heading level.
const defaultElement: Record<TextVariant, ElementType> = {
  display: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  reading: 'p',
  readingLarge: 'p',
  pali: 'p',
  ui: 'p',
  label: 'span',
  groupLabel: 'span',
  caption: 'span',
  code: 'code',
}

type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: TextVariant
  // Pick the element that fits the page outline, for example a heading2 look on an h3.
  as?: ElementType
}

export function Text({ variant = 'ui', as, className, children, ...elementProps }: TextProps) {
  const Element = as ?? defaultElement[variant]
  // Pali text is marked with its language so screen readers pronounce it and the browser picks the right font.
  const language = variant === 'pali' ? 'pi' : undefined

  return (
    <Element lang={language} className={clsx(variantClass[variant], className)} {...elementProps}>
      {children}
    </Element>
  )
}
