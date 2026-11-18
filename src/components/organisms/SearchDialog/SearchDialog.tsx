import { useId, useState, type KeyboardEvent } from 'react'
import { Dialog } from '@ds/atoms/Dialog'
import { Text } from '@ds/atoms/Text'
import { Key } from '@keyboard'
import { searchResultsText, wording } from '@wording'
import { CommandItem } from '@components/molecules/CommandItem'

export type SearchItem = {
  id: string
  label: string
  // What sort of thing it is, for example a chat or an action.
  kindLabel: string
  onChoose: () => void
}

type SearchDialogProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  items: SearchItem[]
}

// The lit row belongs to one query. A new query starts again from the first row.
type Highlight = {
  query: string
  position: number
}

function filterItems(items: SearchItem[], query: string): SearchItem[] {
  const lowerQuery = query.trim().toLowerCase()
  return items.filter((item) => item.label.toLowerCase().includes(lowerQuery))
}

type SearchResultsProps = {
  listId: string
  matches: SearchItem[]
  highlightedItemId?: string
}

function SearchResults({ listId, matches, highlightedItemId }: SearchResultsProps) {
  if (matches.length === 0) {
    return (
      <Text variant="caption" as="p" className="p-4 text-text-muted">
        {wording.noResultsText}
      </Text>
    )
  }
  return (
    <ul
      id={listId}
      role="listbox"
      aria-label={wording.searchResultsLabel}
      className="m-0 max-h-[50vh] list-none overflow-y-auto p-0"
    >
      {matches.map((item) => (
        <CommandItem
          key={item.id}
          id={`${listId}-${item.id}`}
          label={item.label}
          description={item.kindLabel}
          isHighlighted={item.id === highlightedItemId}
          onSelect={item.onChoose}
        />
      ))}
    </ul>
  )
}

function SearchBox({ items }: { items: SearchItem[] }) {
  const listId = useId()
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState<Highlight>({ query: '', position: 0 })

  const matches = filterItems(items, query)
  const position = highlight.query === query ? Math.min(highlight.position, matches.length - 1) : 0
  const highlightedItem = matches[position]
  const highlightedId = highlightedItem ? `${listId}-${highlightedItem.id}` : undefined

  function moveHighlight(step: number) {
    const nextPosition = (position + step + matches.length) % matches.length
    setHighlight({ query, position: nextPosition })
  }

  // A key pressed while a character is being composed (for example in Sinhala) belongs to the input method.
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (matches.length === 0 || event.nativeEvent.isComposing) {
      return
    }
    if (event.key === Key.arrowDown) {
      event.preventDefault()
      moveHighlight(1)
    } else if (event.key === Key.arrowUp) {
      event.preventDefault()
      moveHighlight(-1)
    } else if (event.key === Key.enter && highlightedItem) {
      event.preventDefault()
      highlightedItem.onChoose()
    }
  }

  return (
    <>
      <label>
        <span className="sr-only">{wording.searchDialogTitle}</span>
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={highlightedId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          placeholder={wording.searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-0 border-b border-border bg-page p-4 font-ui text-input text-text [--focus-ring-offset:var(--focus-ring-inset-offset)] placeholder:text-text-muted"
        />
      </label>
      <span role="status" className="sr-only">
        {searchResultsText(matches.length)}
      </span>
      <SearchResults listId={listId} matches={matches} highlightedItemId={highlightedItem?.id} />
      <Text variant="caption" as="p" className="border-t border-border px-4 py-2 text-text-muted">
        {wording.searchHintText}
      </Text>
    </>
  )
}

// Finds chats and actions as you type. The text box keeps the focus while the arrows move the lit row.
export function SearchDialog({ isOpen, onOpenChange, items }: SearchDialogProps) {
  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={wording.searchDialogTitle}
      size="palette"
      isFlush
    >
      <SearchBox items={items} />
    </Dialog>
  )
}
