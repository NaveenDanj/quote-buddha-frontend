import clsx from 'clsx'
import { Icon } from '@ds/atoms/Icon'
import { Text } from '@ds/atoms/Text'
import {
  ReadingView,
  type ReaderAction,
  type ReaderParagraph as ReaderParagraphData,
} from '@domain'
import { paragraphNotesText, readerParagraphLabel } from '@wording'
import { CiteLink } from '@components/molecules/CiteLink'
import { ParagraphActions } from './ParagraphActions'
import { paragraphIdAttribute } from './useTextSelection'

type ReaderParagraphProps = {
  paragraph: ReaderParagraphData
  workRef: string
  linkText: string
  view: ReadingView
  isSelected: boolean
  noteCount: number
  onSelect: (paragraphId: string) => void
  onAction: (action: ReaderAction, paragraphId: string) => void
}

const textColumnClass = 'sm:col-start-2'

function NoteCount({ count }: { count: number }) {
  if (count === 0) {
    return null
  }
  return (
    <Text variant="codeSmall" isMuted className="inline-flex items-center gap-related">
      <Icon name="notes" size="small" label={paragraphNotesText(count)} />
      {count}
    </Text>
  )
}

export function ReaderParagraph({
  paragraph,
  workRef,
  linkText,
  view,
  isSelected,
  noteCount,
  onSelect,
  onAction,
}: ReaderParagraphProps) {
  const showsPali = view !== ReadingView.translation
  const showsTranslation = view !== ReadingView.pali
  const isTranslationMain = view === ReadingView.translation

  return (
    <li
      {...{ [paragraphIdAttribute]: paragraph.id }}
      aria-label={readerParagraphLabel(paragraph.id)}
      aria-current={isSelected ? 'true' : undefined}
      className={clsx(
        'group grid grid-cols-[minmax(0,1fr)] gap-x-section gap-y-group border-t border-l-(length:--reader-selected-rule) border-t-border px-card-tight py-card',
        'sm:grid-cols-[var(--reader-paragraph-id-width)_minmax(0,1fr)]',
        isSelected ? 'border-l-accent bg-surface-subtle' : 'border-l-transparent',
      )}
    >
      <div className="flex flex-wrap items-start gap-group sm:pt-group">
        <CiteLink citationId={paragraph.id} label={paragraph.id} onOpen={onSelect} />
        <NoteCount count={noteCount} />
      </div>
      {showsPali ? (
        <Text variant="pali" className={clsx('max-w-(--measure-wide) min-w-0', textColumnClass)}>
          {paragraph.paliText}
        </Text>
      ) : null}
      {showsTranslation ? (
        <Text
          variant={isTranslationMain ? 'readingLarge' : 'reading'}
          isMuted={!isTranslationMain}
          className={clsx(
            'max-w-(--measure-wide) min-w-0',
            textColumnClass,
            !isTranslationMain && 'border-t border-dashed border-border pt-group',
          )}
        >
          {paragraph.translationText}
        </Text>
      ) : null}
      <div className={textColumnClass}>
        <ParagraphActions
          citationText={`${workRef} · ${paragraph.id}`}
          linkText={linkText}
          isSelected={isSelected}
          onAction={(action) => onAction(action, paragraph.id)}
        />
      </div>
    </li>
  )
}
