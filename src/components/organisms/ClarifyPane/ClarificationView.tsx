import type { ReactNode } from 'react'
import { IconButton } from '@ds/atoms/IconButton'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { getClarificationText, type Clarification } from '@domain'
import { wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { GlossChip } from '@components/molecules/GlossChip'
import { useCopyFeedback } from '@components/organisms/ReaderText/useCopyFeedback'

type ClarificationViewProps = {
  clarification: Clarification
  onSaveAsNote: () => void
  onOpenPassage: (citationId: string) => void
  onOpenTerm: (pali: string) => void
}

function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="grid gap-related">
      <Text variant="label" as="h4">
        {heading}
      </Text>
      {children}
    </div>
  )
}

export function ClarificationView({
  clarification,
  onSaveAsNote,
  onOpenPassage,
  onOpenTerm,
}: ClarificationViewProps) {
  const { copiedKey, copy } = useCopyFeedback()
  const copyKey = 'explanation'

  return (
    <div className="grid gap-section">
      <Tag glyph={TagGlyph.hatched} canWrap>
        {wording.systemLabel}
      </Tag>
      <Section heading={wording.plainMeaningHeading}>
        <Text variant="readingCompact">{clarification.plainMeaning}</Text>
      </Section>
      <Section heading={wording.keyTermsHeading}>
        <div className="flex flex-wrap gap-group">
          {clarification.keyTerms.map((term) => (
            <GlossChip key={term.pali} pali={term.pali} gloss={term.gloss} onOpen={onOpenTerm} />
          ))}
        </div>
      </Section>
      <Section heading={wording.inContextHeading}>
        <Text variant="readingCompact">{clarification.inContext}</Text>
      </Section>
      <Section heading={wording.doesNotSayHeading}>
        <Text variant="readingCompact">{clarification.doesNotSay}</Text>
      </Section>
      <div className="flex flex-wrap items-center gap-group">
        <Text variant="small" isMuted>
          {wording.basedOnLabel}
        </Text>
        <CiteLink
          citationId={clarification.basedOnCitationId}
          label={clarification.basedOnLabel}
          onOpen={onOpenPassage}
        />
      </div>
      <div className="flex gap-group">
        <IconButton icon="add" label={wording.saveAsNoteLabel} onClick={onSaveAsNote} />
        <IconButton
          icon={copiedKey === copyKey ? 'done' : 'copy'}
          label={wording.copyExplanationLabel}
          onClick={() => copy(getClarificationText(clarification), copyKey)}
        />
      </div>
    </div>
  )
}
