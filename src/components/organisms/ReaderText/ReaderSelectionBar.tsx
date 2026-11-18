import type { RefObject } from 'react'
import { ReaderAction } from '@domain'
import { wording } from '@wording'
import { SelectionToolbar } from '@components/molecules/SelectionToolbar'
import { useCopyFeedback } from './useCopyFeedback'
import { selectionToolbarAttribute, useTextSelection } from './useTextSelection'

type ReaderSelectionBarProps = {
  // The text the selection must be inside of.
  containerRef: RefObject<HTMLElement | null>
  workRef: string
  onAction: (action: ReaderAction, paragraphId: string, selectedText: string) => void
}

const citeKey = 'cite'

// A small toolbar above the words the reader selected: note, clarify, ask, or copy the citation.
export function ReaderSelectionBar({ containerRef, workRef, onAction }: ReaderSelectionBarProps) {
  const { selection, clearSelection } = useTextSelection(containerRef)
  const { copiedKey, copy } = useCopyFeedback()

  if (!selection) {
    return null
  }

  function act(action: ReaderAction) {
    if (!selection) {
      return
    }
    onAction(action, selection.paragraphId, selection.text)
    clearSelection()
  }

  return (
    <div
      {...{ [selectionToolbarAttribute]: '' }}
      style={{ left: selection.left, top: selection.top, transform: 'translate(-50%, -100%)' }}
      className="fixed z-(--z-menu)"
    >
      <SelectionToolbar
        label={wording.selectedTextLabel}
        actions={[
          { icon: 'edit', label: wording.addNoteLabel, onSelect: () => act(ReaderAction.note) },
          { icon: 'ai', label: wording.clarifyLabel, onSelect: () => act(ReaderAction.clarify) },
          { icon: 'ask', label: wording.askAboutThisLabel, onSelect: () => act(ReaderAction.ask) },
          {
            icon: copiedKey === citeKey ? 'done' : 'cite',
            label: wording.copyCitationLabel,
            onSelect: () => copy(`${workRef} · ${selection.paragraphId}`, citeKey),
          },
        ]}
      />
    </div>
  )
}
