import { IconButton } from '@ds/atoms/IconButton'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { wording } from '@wording'
import { VersionSwitcher } from '@components/molecules/VersionSwitcher'

type UserMessageProps = {
  text: string
  currentVersion: number
  versionCount: number
  onEdit: () => void
  onPreviousVersion: () => void
  onNextVersion: () => void
}

// The edit button shows on hover and keyboard focus, and always on touch screens, which have no hover.
const editVisibilityClass =
  'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100'

export function UserMessage({
  text,
  currentVersion,
  versionCount,
  onEdit,
  onPreviousVersion,
  onNextVersion,
}: UserMessageProps) {
  return (
    <Surface
      gap={SurfaceSpace.small}
      className="group max-w-(--layout-message-user) justify-items-end justify-self-end"
    >
      <Surface
        look={SurfaceLook.subtle}
        padding={SurfaceSpace.small}
        className="font-reading text-reading text-text"
      >
        <span>
          <VisuallyHidden>{`${wording.youLabel}: `}</VisuallyHidden>
          {text}
        </span>
      </Surface>
      <div className="flex items-center gap-block">
        <span className={editVisibilityClass}>
          <IconButton
            icon="edit"
            label={wording.editAndBranchLabel}
            size="small"
            onClick={onEdit}
          />
        </span>
        <VersionSwitcher
          currentVersion={currentVersion}
          versionCount={versionCount}
          onPrevious={onPreviousVersion}
          onNext={onNextVersion}
        />
      </div>
    </Surface>
  )
}
