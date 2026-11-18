import { DataTable, type DataTableColumn, type DataTableRow } from '@ds/atoms/DataTable'
import { Text } from '@ds/atoms/Text'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import {
  EvidenceState,
  deriveEvidenceMatrix,
  getCitationLabel,
  type Answer,
  type EvidenceMatrixTable,
} from '@domain'
import { evidenceStateText, removedClaimsText, wording } from '@wording'
import { EvidenceGlyph } from '@components/molecules/EvidenceGlyph'
import { Legend } from '@components/molecules/Legend'

const claimColumnKey = 'claim'

const legendStates = [EvidenceState.directQuote, EvidenceState.notVerified, EvidenceState.notUsed]

type MatrixCellProps = {
  state: EvidenceState
}

// The shape is for the eye. The words are for screen readers, and the legend explains the shapes.
function MatrixCell({ state }: MatrixCellProps) {
  return (
    <span className="inline-flex items-center">
      <EvidenceGlyph state={state} />
      <VisuallyHidden>{evidenceStateText[state]}</VisuallyHidden>
    </span>
  )
}

function getColumns(matrix: EvidenceMatrixTable): DataTableColumn[] {
  const passageColumns = matrix.columns.map((source, position) => ({
    key: source.citationId,
    header: `${position + 1} · ${getCitationLabel(source)}`,
  }))
  return [{ key: claimColumnKey, header: wording.graphClaimLabel }, ...passageColumns]
}

function getRows(matrix: EvidenceMatrixTable): DataTableRow[] {
  return matrix.rows.map((row, rowPosition) => {
    const cells: DataTableRow['cells'] = { [claimColumnKey]: row.claim.text }
    row.states.forEach((state, columnPosition) => {
      const source = matrix.columns[columnPosition]
      if (source) {
        cells[source.citationId] = <MatrixCell state={state} />
      }
    })
    return { id: String(rowPosition), cells }
  })
}

type EvidenceMatrixProps = {
  answer: Answer
}

// Claims down the side, retrieved passages across the top. The matrix is worked out from the answer.
export function EvidenceMatrix({ answer }: EvidenceMatrixProps) {
  const matrix = deriveEvidenceMatrix(answer)

  if (matrix.rows.length === 0) {
    return (
      <Text variant="caption" as="p" isMuted>
        {wording.noSupportedAnswerText}
      </Text>
    )
  }

  return (
    <div className="grid gap-block">
      <DataTable
        caption={wording.evidenceMatrixLabel}
        columns={getColumns(matrix)}
        rows={getRows(matrix)}
        rowHeaderKey={claimColumnKey}
      />
      <Legend label={wording.evidenceKeyLabel} states={legendStates} />
      {matrix.removedCount > 0 ? (
        <Text variant="caption" as="p" isMuted>
          {removedClaimsText(matrix.removedCount)}
        </Text>
      ) : null}
    </div>
  )
}
