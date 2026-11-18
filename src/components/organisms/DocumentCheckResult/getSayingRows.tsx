import type { DataTableRow } from '@ds/atoms/DataTable'
import type { DocumentSaying } from '@domain'
import { ClosestPassage } from './ClosestPassage'
import { OutcomeTag } from './OutcomeTag'

export function getSayingRows(
  sayings: DocumentSaying[],
  onOpenPassage: (citationId: string) => void,
): DataTableRow[] {
  return sayings.map((saying) => ({
    id: saying.id,
    cells: {
      saying: saying.text,
      outcome: <OutcomeTag outcome={saying.outcome} />,
      closestPassage: <ClosestPassage saying={saying} onOpenPassage={onOpenPassage} />,
    },
  }))
}
