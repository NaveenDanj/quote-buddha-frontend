import { Disclosure } from '@ds/atoms/Disclosure'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
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
      <div className="flex flex-wrap items-center gap-block font-ui text-caption text-text-muted">
        <CiteLink citationId={citationId} label={passageLabel} onOpen={onOpenPassage} />
        {props.isAiEnhanced ? <Tag glyph={TagGlyph.hatched}>{wording.aiEnhancedTag}</Tag> : null}
        {actions ? <ActionBar label={actionsLabel} actions={actions} /> : null}
      </div>
      <p className="font-reading text-ui whitespace-pre-wrap text-text">{text}</p>
      {props.isAiEnhanced ? (
        <p className="font-ui text-caption text-text-muted">{wording.systemLabel}</p>
      ) : null}
      {props.isAiEnhanced && props.originalText.length > 0 ? (
        <Disclosure summary={wording.originalNote}>
          <p className="font-reading text-ui whitespace-pre-wrap">{props.originalText}</p>
        </Disclosure>
      ) : null}
    </article>
  )
}
