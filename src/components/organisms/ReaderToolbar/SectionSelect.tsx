import { IconButton } from '@ds/atoms/IconButton'
import { Select } from '@ds/atoms/Select'
import { Stamp } from '@ds/atoms/Stamp'
import type { ReaderSection } from '@domain'
import { sectionOptionText, wording } from '@wording'

type SectionSelectProps = {
  sections: ReaderSection[]
  currentIndex: number
  onChangeSection: (index: number) => void
}

export function SectionSelect({ sections, currentIndex, onChangeSection }: SectionSelectProps) {
  const options = sections.map((section, index) => ({
    value: String(index),
    label: sectionOptionText(index + 1, section.paliTitle),
  }))
  const isFirst = currentIndex <= 0
  const isLast = currentIndex >= sections.length - 1

  return (
    <span className="inline-flex items-center gap-related">
      <IconButton
        icon="previous"
        label={wording.previousSectionLabel}
        size="small"
        aria-disabled={isFirst ? true : undefined}
        onClick={isFirst ? undefined : () => onChangeSection(currentIndex - 1)}
      />
      <span className="max-w-(--layout-reader-select) min-w-0">
        <Select
          label={wording.sectionSelectLabel}
          isLabelHidden
          options={options}
          value={String(currentIndex)}
          onValueChange={(value) => onChangeSection(Number(value))}
        />
      </span>
      <IconButton
        icon="next"
        label={wording.nextSectionLabel}
        size="small"
        aria-disabled={isLast ? true : undefined}
        onClick={isLast ? undefined : () => onChangeSection(currentIndex + 1)}
      />
      <Stamp>{`${currentIndex + 1} / ${sections.length}`}</Stamp>
    </span>
  )
}
