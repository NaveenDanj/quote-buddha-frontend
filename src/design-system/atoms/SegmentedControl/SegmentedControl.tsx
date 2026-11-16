import { Chip } from '@ds/atoms/Chip'
import type { IconName } from '@ds/atoms/Icon'

export type SegmentOption = {
  value: string
  label: string
  icon?: IconName
}

type SegmentedControlProps = {
  label: string
  options: SegmentOption[]
  value: string
  onValueChange: (value: string) => void
}

export function SegmentedControl({ label, options, value, onValueChange }: SegmentedControlProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Chip
          key={option.value}
          icon={option.icon}
          isPressed={option.value === value}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </div>
  )
}
