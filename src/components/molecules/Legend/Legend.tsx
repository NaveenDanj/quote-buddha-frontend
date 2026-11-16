import type { EvidenceState } from '@domain'
import { EvidenceTag } from '@components/molecules/EvidenceTag'

type LegendProps = {
  label: string
  states: EvidenceState[]
}

export function Legend({ label, states }: LegendProps) {
  return (
    <ul aria-label={label} className="m-0 flex list-none flex-wrap gap-4 p-0">
      {states.map((state) => (
        <li key={state}>
          <EvidenceTag state={state} />
        </li>
      ))}
    </ul>
  )
}
