import type { ReactNode } from 'react'
import type { TextLanguage } from '@domain'

type PassageQuoteProps = {
  quote: string
  // Required, so Pali is never read aloud with English sounds by mistake.
  language: TextLanguage
  source?: ReactNode
}

// The only component with the quote look. Nothing the system wrote itself may use it.
export function PassageQuote({ quote, language, source }: PassageQuoteProps) {
  return (
    <figure className="grid max-w-(--measure-reading) gap-block border-l-2 border-accent pl-page forced-colors:border-l-4">
      <blockquote lang={language} className="font-reading text-reading-large text-text">
        {quote}
      </blockquote>
      {source ? (
        <figcaption className="flex flex-wrap items-center gap-section font-ui text-caption text-text-muted">
          {source}
        </figcaption>
      ) : null}
    </figure>
  )
}
