import { Tag } from '@ds/atoms/Tag'
import {
  SayingOutcome,
  countOutcomes,
  getEvidenceShapeFromOutcome,
  type DocumentSaying,
} from '@domain'
import { closeParaphraseCountText, foundVerbatimCountText, notFoundCountText } from '@wording'

type OutcomeSummaryProps = {
  sayings: DocumentSaying[]
}

// How many sayings fell into each outcome.
export function OutcomeSummary({ sayings }: OutcomeSummaryProps) {
  const counts = countOutcomes(sayings)

  return (
    <div className="flex flex-wrap items-center gap-page">
      <Tag glyph={getEvidenceShapeFromOutcome(SayingOutcome.verbatim)}>
        {foundVerbatimCountText(counts.verbatim)}
      </Tag>
      <Tag glyph={getEvidenceShapeFromOutcome(SayingOutcome.closeParaphrase)}>
        {closeParaphraseCountText(counts.closeParaphrase)}
      </Tag>
      <Tag glyph={getEvidenceShapeFromOutcome(SayingOutcome.notFound)}>
        {notFoundCountText(counts.notFound)}
      </Tag>
    </div>
  )
}
