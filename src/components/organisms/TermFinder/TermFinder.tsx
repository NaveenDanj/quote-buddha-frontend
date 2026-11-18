import { Input } from '@ds/atoms/Input'
import { ListRow } from '@ds/atoms/ListRow'
import { Text } from '@ds/atoms/Text'
import type { TermSummary } from '@domain'
import { wording } from '@wording'

type TermFinderProps = {
  terms: TermSummary[]
  selectedTermId?: string
  query: string
  onQueryChange: (query: string) => void
  onSelectTerm: (termId: string) => void
}
export function TermFinder({
  terms,
  selectedTermId,
  query,
  onQueryChange,
  onSelectTerm,
}: TermFinderProps) {
  return (
    <>
      <Input
        label={wording.findTermLabel}
        placeholder={wording.findTermPlaceholder}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {terms.length === 0 ? (
        <Text variant="caption" as="p" isMuted>
          {wording.noResultsText}
        </Text>
      ) : (
        <ul aria-label={wording.termListLabel} className="grid list-none border-t border-border">
          {terms.map((term) => (
            <ListRow
              key={term.id}
              isSelected={term.id === selectedTermId}
              onClick={() => onSelectTerm(term.id)}
            >
              <span lang="pi">{term.pali}</span>
            </ListRow>
          ))}
        </ul>
      )}
    </>
  )
}
