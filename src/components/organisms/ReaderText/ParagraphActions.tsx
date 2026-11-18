import clsx from 'clsx'
import { IconButton } from '@ds/atoms/IconButton'
import { ReaderAction } from '@domain'
import { wording } from '@wording'
import { useCopyFeedback } from './useCopyFeedback'

type ParagraphActionsProps = {
  citationText: string
  linkText: string
  isSelected: boolean
  onAction: (action: ReaderAction) => void
}

const CopyKey = {
  citation: 'citation',
  link: 'link',
} as const

const visibilityClass =
  'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100'

export function ParagraphActions({
  citationText,
  linkText,
  isSelected,
  onAction,
}: ParagraphActionsProps) {
  const { copiedKey, copy } = useCopyFeedback()

  return (
    <div className={clsx('flex gap-px', isSelected ? 'opacity-100' : visibilityClass)}>
      <IconButton
        icon="edit"
        label={wording.addNoteLabel}
        size="small"
        onClick={() => onAction(ReaderAction.note)}
      />
      <IconButton
        icon="ai"
        label={wording.clarifyLabel}
        size="small"
        onClick={() => onAction(ReaderAction.clarify)}
      />
      <IconButton
        icon="ask"
        label={wording.askAboutThisLabel}
        size="small"
        onClick={() => onAction(ReaderAction.ask)}
      />
      <IconButton
        icon={copiedKey === CopyKey.citation ? 'done' : 'cite'}
        label={wording.copyCitationLabel}
        size="small"
        onClick={() => copy(citationText, CopyKey.citation)}
      />
      <IconButton
        icon={copiedKey === CopyKey.link ? 'done' : 'link'}
        label={wording.copyLinkLabel}
        size="small"
        onClick={() => copy(linkText, CopyKey.link)}
      />
    </div>
  )
}
