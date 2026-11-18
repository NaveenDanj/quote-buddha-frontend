import { Disclosure } from '@ds/atoms/Disclosure'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { ActionBar, type ActionBarAction } from '@components/molecules/ActionBar'
import { CiteLink } from '@components/molecules/CiteLink'

type NoteCardBaseProps = {
  passageLabel: string
  citationId: string
  onOpenPassage: (citationId: string) => void
  text: string
  actionsLabel: string
  actions?: ActionBarAction[]
}

// A note the system rewrote must say so and must keep what the person wrote.
type NoteCardProps = NoteCardBaseProps &
  ({ isAiEnhanced?: false; originalText?: never } | { isAiEnhanced: true; originalText: string })

export function NoteCard(props: NoteCardProps) {
  const { passageLabel, citationId, onOpenPassage, text, actionsLabel, actions } = props

  return (
    <article
      aria-label={passageLabel}
      className="grid gap-group border-t border-border pt-card-tight"
    >
      <Text variant="caption" as="div" isMuted className="flex flex-wrap items-center gap-block">
        <CiteLink citationId={citationId} label={passageLabel} onOpen={onOpenPassage} />
        {props.isAiEnhanced ? <Tag glyph={TagGlyph.hatched}>{wording.aiEnhancedTag}</Tag> : null}
        {actions ? <ActionBar label={actionsLabel} actions={actions} /> : null}
      </Text>
      <Text variant="readingCompact" className="whitespace-pre-wrap text-text">
        {text}
      </Text>
      {props.isAiEnhanced ? (
        <Text variant="caption" as="p" isMuted>
          {wording.systemLabel}
        </Text>
      ) : null}
      {props.isAiEnhanced && props.originalText.length > 0 ? (
        <Disclosure summary={wording.originalNote}>
          <Text variant="readingCompact" className="whitespace-pre-wrap">
            {props.originalText}
          </Text>
        </Disclosure>
      ) : null}
    </article>
  )
}
