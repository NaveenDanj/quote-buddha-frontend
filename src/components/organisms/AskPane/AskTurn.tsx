import { IconButton } from '@ds/atoms/IconButton'
import { Surface, SurfaceLook, SurfaceSpace } from '@ds/atoms/Surface'
import { Tag } from '@ds/atoms/Tag'
import { Text } from '@ds/atoms/Text'
import { EvidenceState, getEvidenceShape, type PassageQuestion } from '@domain'
import { searchingText, wording } from '@wording'
import { FootnoteMarker } from '@components/molecules/FootnoteMarker'
import { SourceChip } from '@components/molecules/SourceChip'
import { MessageHeader } from '@components/organisms/AssistantMessage/MessageHeader'
import { useCopyFeedback } from '@components/organisms/ReaderText/useCopyFeedback'

type AskTurnProps = {
  turn: PassageQuestion
  onSaveAsNote: (questionId: string) => void
  onOpenPassage: (citationId: string) => void
}

const copyKey = 'answer'

export function AskTurn({ turn, onSaveAsNote, onOpenPassage }: AskTurnProps) {
  const { copiedKey, copy } = useCopyFeedback()
  const { answer } = turn

  return (
    <div className="grid gap-block">
      <Surface
        look={SurfaceLook.subtle}
        padding={SurfaceSpace.small}
        className="max-w-(--layout-message-user) justify-self-end"
      >
        <Text variant="readingCompact">{turn.question}</Text>
      </Surface>

      {answer ? (
        <div className="grid gap-group">
          <MessageHeader>
            <Tag glyph={getEvidenceShape(EvidenceState.directQuote)}>
              {wording.foundInTextsLabel}
            </Tag>
          </MessageHeader>

          <Text variant="readingCompact">
            {answer.text}
            <FootnoteMarker number={1} onOpen={() => onOpenPassage(answer.citationId)} />
          </Text>

          <div className="flex flex-wrap items-center gap-group">
            <Text variant="small" isMuted>
              {wording.sourcesLabel}
            </Text>
            <SourceChip
              number={1}
              label={answer.citationLabel}
              onOpen={() => onOpenPassage(answer.citationId)}
            />
          </div>

          <div className="flex gap-group">
            <IconButton
              icon="add"
              size="small"
              label={wording.saveAsNoteLabel}
              onClick={() => onSaveAsNote(turn.id)}
            />
            <IconButton
              icon={copiedKey === copyKey ? 'done' : 'copy'}
              size="small"
              label={wording.copyAnswerLabel}
              onClick={() => copy(answer.text, copyKey)}
            />
          </div>
        </div>
      ) : (
        <Text variant="caption" as="p" isMuted role="status">
          {searchingText(turn.paragraphId)}
        </Text>
      )}
    </div>
  )
}
