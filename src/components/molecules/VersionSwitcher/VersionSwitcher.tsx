import { IconButton } from '@ds/atoms/IconButton'
import { Text } from '@ds/atoms/Text'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { versionPositionText, wording } from '@wording'

type VersionSwitcherProps = {
  currentVersion: number
  versionCount: number
  onPrevious: () => void
  onNext: () => void
}

export function VersionSwitcher({
  currentVersion,
  versionCount,
  onPrevious,
  onNext,
}: VersionSwitcherProps) {
  if (versionCount <= 1) {
    return null
  }

  const isFirst = currentVersion <= 1
  const isLast = currentVersion >= versionCount

  return (
    <Text
      as="div"
      variant="codeSmall"
      isMuted
      role="group"
      aria-label={wording.versionsLabel}
      className="inline-flex items-center gap-related"
    >
      <IconButton
        icon="previous"
        label={wording.previousVersionLabel}
        size="small"
        aria-disabled={isFirst ? true : undefined}
        onClick={isFirst ? undefined : onPrevious}
      />
      <span role="status">
        <span aria-hidden="true">{`${currentVersion} / ${versionCount}`}</span>
        <VisuallyHidden>{versionPositionText(currentVersion, versionCount)}</VisuallyHidden>
      </span>
      <IconButton
        icon="next"
        label={wording.nextVersionLabel}
        size="small"
        aria-disabled={isLast ? true : undefined}
        onClick={isLast ? undefined : onNext}
      />
    </Text>
  )
}
