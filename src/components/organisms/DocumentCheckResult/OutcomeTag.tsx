import { Tag } from '@ds/atoms/Tag'
import { SayingOutcome, getEvidenceShapeFromOutcome } from '@domain'
import { wording } from '@wording'

const outcomeLabel: Record<SayingOutcome, string> = {
  verbatim: wording.outcomeVerbatimLabel,
  closeParaphrase: wording.outcomeCloseParaphraseLabel,
  notFound: wording.outcomeNotFoundLabel,
}

type OutcomeTagProps = {
  outcome: SayingOutcome
}

export function OutcomeTag({ outcome }: OutcomeTagProps) {
  return <Tag glyph={getEvidenceShapeFromOutcome(outcome)}>{outcomeLabel[outcome]}</Tag>
}
