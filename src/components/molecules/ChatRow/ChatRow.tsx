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
    <li className="group grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-border">
      <button
        type="button"
        onClick={onOpen}
        aria-current={isSelected ? 'page' : undefined}
        className={clsx(
          'min-w-0 cursor-pointer truncate border-y-0 border-r-0 border-l-2 bg-transparent px-3 py-3 text-left font-ui text-ui text-text',
          'transition-colors duration-(--motion-fast) hover:bg-surface-subtle',
          isSelected
            ? 'border-l-text bg-surface-subtle forced-colors:border-l-4'
            : 'border-l-transparent',
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
