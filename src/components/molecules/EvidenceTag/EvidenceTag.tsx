import { Tag } from '@ds/atoms/Tag'
import { getEvidenceShape, type EvidenceState } from '@domain'
import { evidenceStateText } from '@wording'

export function EvidenceTag({ state }: { state: EvidenceState }) {
  return <Tag glyph={getEvidenceShape(state)}>{evidenceStateText[state]}</Tag>
}
