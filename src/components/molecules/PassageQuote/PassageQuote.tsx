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
    <figure className="m-0 grid max-w-(--measure-reading) gap-3 border-l-2 border-accent pl-5 forced-colors:border-l-4">
      <blockquote lang={language} className="m-0 font-reading text-reading-large text-text">
        {quote}
      </blockquote>
      {source ? (
        <figcaption className="flex flex-wrap items-center gap-4 font-ui text-caption text-text-muted">
          {source}
        </figcaption>
      ) : null}
    </figure>
  )
}
