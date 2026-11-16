import clsx from 'clsx'
import { Icon, type IconName } from '@ds/atoms/Icon'
import { IconButton } from '@ds/atoms/IconButton'

type RemovableChipProps = {
  label: string
  // The name of the remove button, for example "Remove notes.pdf".
  removeLabel: string
  onRemove: () => void
  icon?: IconName
  isDashed?: boolean
}

export function RemovableChip({
  label,
  removeLabel,
  onRemove,
  icon,
  isDashed = false,
}: RemovableChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex min-h-(--control-small) max-w-full items-center gap-1 rounded border border-text-muted pr-1 pl-3',
        isDashed && 'border-dashed',
      )}
    >
      {icon ? <Icon name={icon} size="small" /> : null}
      <span className="min-w-0 truncate font-ui text-label font-medium text-text-muted">
        {label}
      </span>
      <IconButton icon="close" label={removeLabel} size="small" onClick={onRemove} />
    </span>
  )
}
