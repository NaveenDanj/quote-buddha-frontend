import clsx from 'clsx'
import { IconButton } from '@ds/atoms/IconButton'
import { Menu, type MenuItem } from '@ds/atoms/Menu'
import { SelectableRow } from '@ds/atoms/SelectableRow'

type ChatRowProps = {
  title: string
  isSelected?: boolean
  onOpen: () => void
  menuLabel: string
  menuItems: MenuItem[]
}

// The options button shows on hover and focus, and always on touch screens, which have no hover.
const optionsVisibilityClass = clsx(
  'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100',
  'group-has-[[aria-expanded=true]]:opacity-100 pointer-coarse:opacity-100',
)

export function ChatRow({ title, isSelected = false, onOpen, menuLabel, menuItems }: ChatRowProps) {
  return (
    <li className="group grid grid-cols-[minmax(0,1fr)_auto] items-center">
      <SelectableRow isCurrent={isSelected} onClick={onOpen} className="min-w-0">
        {title}
      </SelectableRow>
      <span className={optionsVisibilityClass}>
        <Menu
          trigger={<IconButton icon="more" label={menuLabel} size="small" />}
          items={menuItems}
        />
      </span>
    </li>
  )
}
