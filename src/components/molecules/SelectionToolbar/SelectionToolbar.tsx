import { IconButton, IconButtonLook } from '@ds/atoms/IconButton'
import type { ActionBarAction } from '@components/molecules/ActionBar'

export type SelectionToolbarAction = Omit<ActionBarAction, 'isPressed'>

type SelectionToolbarProps = {
  label: string
  actions: SelectionToolbarAction[]
}

export function SelectionToolbar({ label, actions }: SelectionToolbarProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex gap-px rounded bg-inverse-bg p-px forced-colors:border"
    >
      {actions.map((action) => (
        <IconButton
          key={action.label}
          icon={action.icon}
          label={action.label}
          size="small"
          look={IconButtonLook.onInverse}
          onClick={action.onSelect}
        />
      ))}
    </div>
  )
}
