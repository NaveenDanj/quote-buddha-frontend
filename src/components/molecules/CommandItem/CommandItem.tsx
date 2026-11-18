import { Stamp } from '@ds/atoms/Stamp'
import { ListboxOption } from '@ds/atoms/ListboxOption'
import { Text } from '@ds/atoms/Text'

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
      <ListboxOption
        id={id}
        isHighlighted={isHighlighted}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSelect}
      >
        <span>{label}</span>
        {description ? (
          <Text variant="caption" isMuted>
            {description}
          </Text>
        ) : null}
        {shortcut ? <Stamp isKey>{shortcut}</Stamp> : null}
      </ListboxOption>
    </li>
  )
}
