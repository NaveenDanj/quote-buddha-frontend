import { Button } from '@ds/atoms/Button'
import { DataTable, type DataTableRow } from '@ds/atoms/DataTable'
import { Text } from '@ds/atoms/Text'
import {
  SayingOutcome,
  countOutcomes,
  getEvidenceShape,
  getEvidenceStateFromOutcome,
  type DocumentSaying,
} from '@domain'
import {
  closeParaphraseCountText,
  foundVerbatimCountText,
  notFoundCountText,
  wording,
} from '@wording'
import { Tag } from '@ds/atoms/Tag'
import { CiteLink } from '@components/molecules/CiteLink'

type DocumentCheckResultProps = {
  sayings: DocumentSaying[]
  onOpenPassage: (citationId: string) => void
  onExportReport: () => void
}

const outcomeLabel: Record<SayingOutcome, string> = {
  verbatim: wording.outcomeVerbatimLabel,
  closeParaphrase: wording.outcomeCloseParaphraseLabel,
  notFound: wording.outcomeNotFoundLabel,
}

const columns = [
  { key: 'saying', header: wording.sayingColumnHeader },
  { key: 'outcome', header: wording.resultColumnHeader },
  { key: 'closestPassage', header: wording.closestPassageColumnHeader },
]

function OutcomeTag({ outcome }: { outcome: SayingOutcome }) {
  const shape = getEvidenceShape(getEvidenceStateFromOutcome(outcome))
  return <Tag glyph={shape}>{outcomeLabel[outcome]}</Tag>
}

function ClosestPassage({
  saying,
  onOpenPassage,
}: {
  saying: DocumentSaying
  onOpenPassage: (citationId: string) => void
}) {
  if (saying.closestCitationId && saying.closestCitationLabel) {
    return (
      <CiteLink
        citationId={saying.closestCitationId}
        label={saying.closestCitationLabel}
        onOpen={onOpenPassage}
      />
    )
  }
  return (
    <Text variant="ui" isMuted>
      {wording.noClosestPassageText}
    </Text>
  )
}

function toRow(saying: DocumentSaying, onOpenPassage: (citationId: string) => void): DataTableRow {
  return {
    id: saying.id,
    cells: {
      saying: saying.text,
      outcome: <OutcomeTag outcome={saying.outcome} />,
      closestPassage: <ClosestPassage saying={saying} onOpenPassage={onOpenPassage} />,
    },
  }
}

function OutcomeSummary({ sayings }: { sayings: DocumentSaying[] }) {
  const counts = countOutcomes(sayings)
  return (
    <div className="flex flex-wrap items-center gap-page">
      <Tag glyph={getEvidenceShape(getEvidenceStateFromOutcome(SayingOutcome.verbatim))}>
        {foundVerbatimCountText(counts.verbatim)}
      </Tag>
      <Tag glyph={getEvidenceShape(getEvidenceStateFromOutcome(SayingOutcome.closeParaphrase))}>
        {closeParaphraseCountText(counts.closeParaphrase)}
      </Tag>
      <Tag glyph={getEvidenceShape(getEvidenceStateFromOutcome(SayingOutcome.notFound))}>
        {notFoundCountText(counts.notFound)}
      </Tag>
    </div>
  )
}

// What was found in a document: a count for each outcome, then one row for each saying.
export function DocumentCheckResult({
  sayings,
  onOpenPassage,
  onExportReport,
}: DocumentCheckResultProps) {
  const rows = sayings.map((saying) => toRow(saying, onOpenPassage))

  return (
    <section aria-label={wording.documentResultLabel} className="grid gap-section">
      <div className="flex flex-wrap items-end justify-between gap-block">
        <Text variant="label" as="h2">
          {wording.documentResultHeading}
        </Text>
        <Button variant="secondary" size="small" onClick={onExportReport}>
          {wording.exportReportLabel}
        </Button>
      </div>
      <OutcomeSummary sayings={sayings} />
      <DataTable caption={wording.documentResultLabel} columns={columns} rows={rows} />
      <Text
        variant="caption"
        as="p"
        isMuted
        className="max-w-(--measure-reading) border-t border-border pt-block"
      >
        {wording.verifyDisclaimer}
      </Text>
    </section>
  )
}
