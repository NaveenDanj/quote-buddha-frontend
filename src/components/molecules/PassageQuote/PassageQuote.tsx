import type { ReactNode } from 'react'
import { Text } from '@ds/atoms/Text'
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
      <Text variant="readingLarge" as="blockquote" lang={language} className="text-text">
        {quote}
      </Text>
      {source ? (
        <Text
          variant="caption"
          as="figcaption"
          isMuted
          className="flex flex-wrap items-center gap-section"
        >
          {source}
        </Text>
      ) : null}
    </figure>
  )
}
