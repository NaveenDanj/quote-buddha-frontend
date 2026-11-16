import { IconButton } from '@ds/atoms/IconButton'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { sectionPositionText, wording } from '@wording'

type SectionStepperProps = {
  title: string
  sectionNumber: number
  sectionCount: number
  onPrevious: () => void
  onNext: () => void
}

export function SectionStepper({
  title,
  sectionNumber,
  sectionCount,
  onPrevious,
  onNext,
}: SectionStepperProps) {
  const isFirst = sectionNumber <= 1
  const isLast = sectionNumber >= sectionCount

  return (
    <div role="group" aria-label={wording.sectionsLabel} className="flex items-center gap-2">
      <IconButton
        icon="previous"
        label={wording.previousSectionLabel}
        size="small"
        aria-disabled={isFirst ? true : undefined}
        onClick={isFirst ? undefined : onPrevious}
      />
      <div role="status" className="grid min-w-0 text-center">
        <span className="truncate font-ui text-label font-medium text-text">{title}</span>
        <span aria-hidden="true" className="font-code text-stamp text-text-muted">
          {`${sectionNumber} / ${sectionCount}`}
        </span>
        <VisuallyHidden>{sectionPositionText(sectionNumber, sectionCount)}</VisuallyHidden>
      </div>
      <IconButton
        icon="next"
        label={wording.nextSectionLabel}
        size="small"
        aria-disabled={isLast ? true : undefined}
        onClick={isLast ? undefined : onNext}
      />
    </div>
  )
}
