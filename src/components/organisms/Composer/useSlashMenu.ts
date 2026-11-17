import { useState, type KeyboardEvent } from 'react'
import { filterSlashCommands, getSlashQuery, type SlashCommand } from '@domain'
import { Key } from '@keyboard'

type SlashMenuOptions = {
  value: string
  commands: SlashCommand[]
  onRunCommand: (command: SlashCommand) => void
}

// Which row is lit belongs to one query. A new query starts again from the first row.
type Highlight = {
  query: string | null
  position: number
}

export function useSlashMenu({ value, commands, onRunCommand }: SlashMenuOptions) {
  const [highlight, setHighlight] = useState<Highlight>({ query: null, position: 0 })
  const [dismissedValue, setDismissedValue] = useState<string | null>(null)

  const query = getSlashQuery(value)
  const matches = query === null ? [] : filterSlashCommands(commands, query)
  const isOpen = matches.length > 0 && dismissedValue !== value
  const position = highlight.query === query ? Math.min(highlight.position, matches.length - 1) : 0
  // A closed menu has no lit row, so the text box never points at a row that is not on the screen.
  const highlightedCommand = isOpen ? matches[position] : undefined

  function moveHighlight(step: number) {
    const nextPosition = (position + step + matches.length) % matches.length
    setHighlight({ query, position: nextPosition })
  }

  function runHighlightedCommand() {
    if (highlightedCommand) {
      onRunCommand(highlightedCommand)
    }
  }

  // Returns true when the key belonged to the menu, so the text box does not also act on it.
  // Tab is not used: it must always be free to move on. A key pressed while a character is being
  // composed (for example in Sinhala) belongs to the input method, not to the menu.
  function handleKey(event: KeyboardEvent<HTMLElement>): boolean {
    if (!isOpen || event.nativeEvent.isComposing) {
      return false
    }

    switch (event.key) {
      case Key.arrowDown:
        moveHighlight(1)
        break
      case Key.arrowUp:
        moveHighlight(-1)
        break
      case Key.enter:
        runHighlightedCommand()
        break
      case Key.escape:
        setDismissedValue(value)
        event.stopPropagation()
        break
      default:
        return false
    }
    event.preventDefault()
    return true
  }

  return { isOpen, matches, highlightedCommand, handleKey }
}
