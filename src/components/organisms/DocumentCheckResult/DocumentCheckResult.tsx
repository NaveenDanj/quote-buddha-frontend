import { Button } from '@ds/atoms/Button'
import { DataTable } from '@ds/atoms/DataTable'
import { Text } from '@ds/atoms/Text'
import type { DocumentSaying } from '@domain'
import { wording } from '@wording'
import { ScopeDisclaimer } from '@components/molecules/ScopeDisclaimer'
import { getSayingRows } from './getSayingRows'
import { OutcomeSummary } from './OutcomeSummary'

type DocumentCheckResultProps = {
  sayings: DocumentSaying[]
  onOpenPassage: (citationId: string) => void
  onExportReport: () => void
}

const columns = [
  { key: 'saying', header: wording.sayingColumnHeader },
  { key: 'outcome', header: wording.resultColumnHeader },
  { key: 'closestPassage', header: wording.closestPassageColumnHeader },
]

// What was found in a document: a count for each outcome, then one row for each saying.
export function DocumentCheckResult({
  sayings,
  onOpenPassage,
  onExportReport,
}: DocumentCheckResultProps) {
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
      <DataTable
        caption={wording.documentResultLabel}
        columns={columns}
        rows={getSayingRows(sayings, onOpenPassage)}
        isWide
      />
      <ScopeDisclaimer />
    </section>
  )
}
