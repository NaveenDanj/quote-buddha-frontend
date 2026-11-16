import { IconButton } from '@ds/atoms/IconButton'
import type { IconName } from '@ds/atoms/Icon'

export type ActionBarAction = {
  icon: IconName
  label: string
  onSelect: () => void
  isPressed?: boolean
}

type ActionBarProps = {
  label: string
  actions: ActionBarAction[]
}

export function ActionBar({ label, actions }: ActionBarProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      {actions.map((action) => (
        <IconButton
          key={action.label}
          icon={action.icon}
          label={action.label}
          size="small"
          isPressed={action.isPressed}
          onClick={action.onSelect}
        />
      ))}
    </div>
  )
}
