import clsx from 'clsx'
import type { ElementType, HTMLAttributes } from 'react'

export type TextVariant =
  | 'display'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'toolTitle'
  | 'readerTitle'
  | 'termTitle'
  | 'reading'
  | 'readingLarge'
  | 'readingCompact'
  | 'pali'
  | 'ui'
  | 'nav'
  | 'label'
  | 'groupLabel'
  | 'caption'
  | 'small'
  | 'code'
  | 'codeSmall'
  | 'input'
  | 'readingInput'

export type TextWeight = 'normal' | 'medium' | 'semibold'

const variantClass: Record<TextVariant, string> = {
  display: 'font-reading text-display',
  heading1: 'font-reading text-heading-1',
  heading2: 'font-reading text-heading-2',
  heading3: 'font-reading text-heading-3',
  toolTitle: 'font-reading text-tool-title',
  // The title of a section in the Reader. It shrinks on a phone.
  readerTitle: 'font-reading text-reader-title',
  // The name of a Pali term when it is the subject of the page.
  termTitle: 'font-reading text-term-title',
  reading: 'font-reading text-reading',
  readingLarge: 'font-reading text-reading-large',
  readingCompact: 'font-reading text-ui',
  pali: 'font-reading text-pali',
  ui: 'font-ui text-ui',
  nav: 'font-ui text-nav',
  label: 'font-ui text-label',
  groupLabel: 'font-ui text-stamp uppercase tracking-group',
  caption: 'font-ui text-caption',
  small: 'font-ui text-stamp',
  code: 'font-code text-code',
  codeSmall: 'font-code text-stamp',
  input: 'font-ui text-input',
  readingInput: 'font-reading text-input',
}

const variantWeight: Partial<Record<TextVariant, TextWeight>> = {
  display: 'normal',
  heading1: 'normal',
  heading2: 'medium',
  heading3: 'medium',
  toolTitle: 'normal',
  readerTitle: 'normal',
  termTitle: 'normal',
  label: 'semibold',
  groupLabel: 'semibold',
}

const weightClass: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
}

const defaultElement: Record<TextVariant, ElementType> = {
  display: 'h1',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  toolTitle: 'h1',
  readerTitle: 'h2',
  termTitle: 'h2',
  reading: 'p',
  readingLarge: 'p',
  readingCompact: 'p',
  pali: 'p',
  ui: 'p',
  nav: 'span',
  label: 'span',
  groupLabel: 'span',
  caption: 'span',
  small: 'span',
  code: 'code',
  codeSmall: 'span',
  input: 'span',
  readingInput: 'span',
}

export function getTextClass(variant: TextVariant, weight?: TextWeight): string {
  const chosenWeight = weight ?? variantWeight[variant]
  return clsx(variantClass[variant], chosenWeight && weightClass[chosenWeight])
}

type TextProps = HTMLAttributes<HTMLElement> & {
  variant?: TextVariant
  weight?: TextWeight
  as?: ElementType
  isMuted?: boolean
}

export function Text({
  variant = 'ui',
  weight,
  as,
  isMuted = false,
  className,
  children,
  ...elementProps
}: TextProps) {
  const Element = as ?? defaultElement[variant]
  const language = variant === 'pali' ? 'pi' : undefined

  return (
    <Element
      lang={language}
      className={clsx(getTextClass(variant, weight), isMuted && 'text-text-muted', className)}
      {...elementProps}
    >
      {children}
    </Element>
  )
}
