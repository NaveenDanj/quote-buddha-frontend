import { SelectableRow } from '@ds/atoms/SelectableRow'
import { Text } from '@ds/atoms/Text'
import type { ReaderSection } from '@domain'
import { sectionOptionText, sectionsOutlineHeading, wording } from '@wording'

type SectionOutlineProps = {
  workRef: string
  sections: ReaderSection[]
  currentIndex: number
  onSelectSection: (index: number) => void
}

export function SectionOutline({
  workRef,
  sections,
  currentIndex,
  onSelectSection,
}: SectionOutlineProps) {
  return (
    <nav aria-label={wording.sectionsInSuttaLabel} className="grid content-start gap-px">
      <Text variant="label" isMuted className="pl-card-tight">
        {sectionsOutlineHeading(workRef)}
      </Text>
      {sections.map((section, index) => (
        <SelectableRow
          key={section.id}
          isCurrent={index === currentIndex}
          onClick={() => onSelectSection(index)}
        >
          <span className="grid min-w-0">
            <span lang="pi">{sectionOptionText(index + 1, section.paliTitle)}</span>
            <Text variant="small" isMuted>
              {section.englishTitle}
            </Text>
          </span>
        </SelectableRow>
      ))}
    </nav>
  )
}
