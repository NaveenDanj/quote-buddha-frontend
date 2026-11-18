import { Tag } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import {
  QuoteOutcome,
  getEvidenceShapeFromQuoteOutcome,
  type QuotePassage,
  type TextPart,
} from '@domain'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { MarkedText } from './MarkedText'

type CloseParaphraseProps = {
  passage: QuotePassage
  yourQuoteParts: TextPart[]
  passageParts: TextPart[]
  onOpenPassage: (citationId: string) => void
}

export function CloseParaphrase({
  passage,
  yourQuoteParts,
  passageParts,
  onOpenPassage,
}: CloseParaphraseProps) {
  return (
    <>
      <Tag glyph={getEvidenceShapeFromQuoteOutcome(QuoteOutcome.closeParaphrase)}>
        {wording.verifyClose}
      </Tag>
      <Text variant="caption" as="p" isMuted>
        {wording.verifyCloseNote}
      </Text>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(var(--layout-compare-column),1fr))] gap-page">
        <div className="grid min-w-0 content-start gap-group">
          <Text variant="label">{wording.yourQuoteLabel}</Text>
          <MarkedText parts={yourQuoteParts} />
        </div>
        <div className="grid min-w-0 content-start gap-group">
          <span className="flex flex-wrap items-center gap-group">
            <Text variant="label">{wording.closestPassageLabel} ·</Text>
            <CiteLink
              citationId={passage.citationId}
              label={passage.citationLabel}
              onOpen={onOpenPassage}
            />
          </span>
          <MarkedText parts={passageParts} />
        </div>
      </div>
    </>
  )
}
