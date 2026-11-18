import { Tag } from '@ds/atoms/Tag'
import { QuoteOutcome, getEvidenceShapeFromQuoteOutcome, type QuotePassage } from '@domain'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { PassageQuote } from '@components/molecules/PassageQuote'

type FoundVerbatimProps = {
  passage: QuotePassage
  onOpenPassage: (citationId: string) => void
}

export function FoundVerbatim({ passage, onOpenPassage }: FoundVerbatimProps) {
  return (
    <>
      <Tag glyph={getEvidenceShapeFromQuoteOutcome(QuoteOutcome.foundVerbatim)}>
        {wording.verifyFound}
      </Tag>
      <PassageQuote
        quote={passage.text}
        language={passage.language}
        source={
          <>
            <CiteLink
              citationId={passage.citationId}
              label={passage.citationLabel}
              onOpen={onOpenPassage}
            />
            <span>{passage.edition}</span>
          </>
        }
      />
    </>
  )
}
