import type { EvidenceState } from '@domain'
import { EvidenceTag } from '@components/molecules/EvidenceTag'

type LegendProps = {
  label: string
  states: EvidenceState[]
}

export function Legend({ label, states }: LegendProps) {
  return (
    <ul aria-label={label} className="flex list-none flex-wrap gap-section">
      {states.map((state) => (
        <li key={state}>
          <EvidenceTag state={state} />
        </li>
      ))}
    </ul>
  )
}
