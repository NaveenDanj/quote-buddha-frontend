import { Disclosure } from '@ds/atoms/Disclosure'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { Tag, TagGlyph } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { EvidenceState, TextLanguage, formatNoteDate, type NotebookEntry } from '@domain'
import { noteDateText, wording } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { EvidenceTag } from '@components/molecules/EvidenceTag'
import { PassageQuote } from '@components/molecules/PassageQuote'

type NotebookNoteCardProps = {
  entry: NotebookEntry
  onOpenPassage: (citationId: string) => void
}

export function NotebookNoteCard({ entry, onOpenPassage }: NotebookNoteCardProps) {
  const { passage } = entry
  const source = passage ? (
    <>
      <CiteLink citationId={passage.citationId} label={passage.label} onOpen={onOpenPassage} />
      <EvidenceTag state={EvidenceState.directQuote} />
    </>
  ) : null

  return (
    <Surface
      as="article"
      padding={SurfaceSpace.medium}
      gap={SurfaceSpace.medium}
      className="rounded border border-border"
    >
      <Text variant="label" isMuted>
        {noteDateText(formatNoteDate(entry.createdAtInMilliseconds))}
      </Text>
      <Text variant="reading" as="p" className="whitespace-pre-wrap">
        {entry.text}
      </Text>
      {entry.isAiEnhanced ? (
        <>
          <Tag glyph={TagGlyph.hatched} canWrap>
            {wording.aiEnhancedTag}
          </Tag>
          <Text variant="caption" as="p" isMuted>
            {wording.systemLabel}
          </Text>
        </>
      ) : null}
      {entry.isAiEnhanced && entry.originalText ? (
        <Disclosure summary={wording.originalNote}>
          <Text variant="readingCompact" className="whitespace-pre-wrap">
            {entry.originalText}
          </Text>
        </Disclosure>
      ) : null}
      {passage?.quote ? (
        <PassageQuote quote={passage.quote} language={TextLanguage.english} source={source} />
      ) : (
        source
      )}
    </Surface>
  )
}
