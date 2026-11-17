import type { SlashCommand } from '@domain'
import { Surface, SurfaceLook } from '@ds/atoms/Surface'
import { wording } from '@wording'
import { CommandItem } from '@components/molecules/CommandItem'

type SlashMenuProps = {
  listId: string
  commands: SlashCommand[]
  highlightedId?: string
  onChoose: (command: SlashCommand) => void
}

export function getCommandItemId(listId: string, command: SlashCommand): string {
  return `${listId}-${command.id}`
}

// The list under the composer's text box while the text starts with "/". The text box keeps the focus.
export function SlashMenu({ listId, commands, highlightedId, onChoose }: SlashMenuProps) {
  return (
    <Surface
      look={SurfaceLook.outlined}
      className="absolute inset-x-0 bottom-full z-(--z-menu) mb-1"
    >
      <ul
        id={listId}
        role="listbox"
        aria-label={wording.slashMenuLabel}
        className="m-0 max-h-(--menu-max-height) list-none overflow-y-auto p-0"
      >
        {commands.map((command) => {
          const itemId = getCommandItemId(listId, command)
          return (
            <CommandItem
              key={command.id}
              id={itemId}
              label={`/${command.name}`}
              description={command.label}
              shortcut={command.shortcut}
              isHighlighted={itemId === highlightedId}
              onSelect={() => onChoose(command)}
            />
          )
        })}
      </ul>
    </Surface>
  )
}
