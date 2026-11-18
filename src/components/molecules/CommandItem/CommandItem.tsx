import clsx from 'clsx'
import { Stamp } from '@ds/atoms/Stamp'

type CommandItemProps = {
  // The palette points at the highlighted item by this id (aria-activedescendant).
  id: string
  label: string
  // Says what the command does, in quiet text after the label.
  description?: string
  shortcut?: string
  isHighlighted: boolean
  onSelect: () => void
}

export function CommandItem({
  id,
  label,
  description,
  shortcut,
  isHighlighted,
  onSelect,
}: CommandItemProps) {
  return (
    <li role="presentation" className="border-b border-border">
      <button
        id={id}
        type="button"
        role="option"
        aria-selected={isHighlighted}
        tabIndex={-1}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSelect}
        className={clsx(
          'flex w-full cursor-pointer items-center justify-between gap-section border-y-0 border-r-0 border-l-2 px-card py-card-tight text-left font-ui text-ui text-text',
          isHighlighted
            ? 'border-l-text bg-surface-subtle forced-colors:outline'
            : 'border-l-transparent bg-transparent',
        )}
      >
        <span>{label}</span>
        {description ? <span className="text-caption text-text-muted">{description}</span> : null}
        {shortcut ? <Stamp isKey>{shortcut}</Stamp> : null}
      </button>
    </li>
  )
}
