import { Tag } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { QuoteOutcome, getEvidenceShapeFromQuoteOutcome } from '@domain'
import { wording } from '@wording'

export function NotFound() {
  return (
    <>
      <Tag glyph={getEvidenceShapeFromQuoteOutcome(QuoteOutcome.notFound)}>
        {wording.verifyNone}
      </Tag>
      <Text variant="readingLarge" as="p" className="max-w-(--measure-short)">
        {wording.verifyNoneText}
      </Text>
    </>
  )
}
