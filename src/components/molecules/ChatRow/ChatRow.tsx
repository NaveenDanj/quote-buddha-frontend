import clsx from 'clsx'
import { IconButton } from '@ds/atoms/IconButton'
import { Menu, type MenuItem } from '@ds/atoms/Menu'

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
      <button
        type="button"
        onClick={onOpen}
        aria-current={isSelected ? 'page' : undefined}
        className={clsx(
          'min-w-0 cursor-pointer border-y-0 border-r-0 border-l-2 bg-transparent py-(--nav-row-padding-y) pr-0 pl-3 text-left font-ui text-nav',
          'transition-colors duration-(--motion-fast)',
          isSelected
            ? 'border-l-text font-medium text-text forced-colors:border-l-4'
            : 'border-l-transparent text-text-muted hover:text-text',
        )}
      >
        {title}
      </button>
      <span className={optionsVisibilityClass}>
        <Menu
          trigger={<IconButton icon="more" label={menuLabel} size="small" />}
          items={menuItems}
        />
      </span>
    </li>
  )
}
