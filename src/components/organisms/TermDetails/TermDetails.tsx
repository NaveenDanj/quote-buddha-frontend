import { FactList } from '@ds/atoms/FactList'
import { Text } from '@ds/atoms/Text'
import type { TermEntry } from '@domain'
import { wording } from '@wording'
import { OccurrenceBars } from '@components/molecules/OccurrenceBars'
import { TermPassageBlock } from './TermPassageBlock'

type TermDetailsProps = {
  term: TermEntry
  onOpenPassage: (citationId: string) => void
  onOpenReader: (citationId: string) => void
  onAskAboutTerm: () => void
}

// Everything known about one term: its name and gloss, its variants, how often it occurs, and a passage with it.
export function TermDetails({
  term,
  onOpenPassage,
  onOpenReader,
  onAskAboutTerm,
}: TermDetailsProps) {
  const facts = [
    { label: wording.glossesLabel, value: term.glossesText },
    { label: wording.variantsLabel, value: <span lang="pi">{term.variants.join(', ')}</span> },
    { label: wording.termNoteLabel, value: term.note },
  ]

  return (
    <>
      <div className="grid gap-group">
        <Text variant="termTitle" lang="pi">
          {term.pali}
        </Text>
        <Text variant="ui" as="p" isMuted>
          {term.gloss}
        </Text>
      </div>
      <FactList facts={facts} />
      <div className="grid gap-group">
        <Text variant="label" as="h3">
          {wording.occurrencesHeading}
        </Text>
        <OccurrenceBars occurrences={term.occurrences} />
        <Text variant="caption" as="p" isMuted>
          {wording.onlyIncludedCounted}
        </Text>
      </div>
      {term.passage ? (
        <TermPassageBlock
          passage={term.passage}
          onOpenPassage={onOpenPassage}
          onOpenReader={onOpenReader}
          onAskAboutTerm={onAskAboutTerm}
        />
      ) : null}
    </>
  )
}
