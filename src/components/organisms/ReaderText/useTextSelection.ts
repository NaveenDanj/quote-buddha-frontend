import { useEffect, useState, type RefObject } from 'react'
import { Key } from '@keyboard'

export const paragraphIdAttribute = 'data-paragraph-id'
export const selectionToolbarAttribute = 'data-selection-toolbar'

const shortestSelectionInCharacters = 3

export type TextSelection = {
  text: string
  paragraphId: string
  // Where the toolbar goes: the middle of the selected words, at their top edge.
  left: number
  top: number
}

function getSelectedText(selection: Selection | null): string {
  if (!selection || selection.rangeCount === 0) {
    return ''
  }
  const text = selection.toString().trim()
  return text.length >= shortestSelectionInCharacters ? text : ''
}

// The paragraph the selection starts in, if it is inside the text.
function findParagraph(selection: Selection, container: HTMLElement | null): Element | null {
  const anchor = selection.anchorNode
  const anchorElement = anchor instanceof Element ? anchor : anchor?.parentElement
  const paragraph = anchorElement?.closest(`[${paragraphIdAttribute}]`) ?? null
  return paragraph && container?.contains(paragraph) ? paragraph : null
}

function readSelection(container: HTMLElement | null): TextSelection | undefined {
  const selection = window.getSelection()
  const text = getSelectedText(selection)
  const paragraph = selection && text ? findParagraph(selection, container) : null
  if (!selection || !paragraph) {
    return undefined
  }
  const box = selection.getRangeAt(0).getBoundingClientRect()
  return {
    text,
    paragraphId: paragraph.getAttribute(paragraphIdAttribute) ?? '',
    left: box.left + box.width / 2,
    top: box.top,
  }
}

// The words the reader has selected inside the text. It is cleared when they click elsewhere, scroll or press Escape.
export function useTextSelection(containerRef: RefObject<HTMLElement | null>) {
  const [selection, setSelection] = useState<TextSelection>()

  useEffect(() => {
    function showSelectionOnceItSettles() {
      setTimeout(() => setSelection(readSelection(containerRef.current)), 0)
    }
    function hideUnlessOnToolbar(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null
      if (!target?.closest(`[${selectionToolbarAttribute}]`)) {
        setSelection(undefined)
      }
    }
    function hideOnEscape(event: KeyboardEvent) {
      if (event.key === Key.escape) {
        setSelection(undefined)
      }
    }
    function hide() {
      setSelection(undefined)
    }

    document.addEventListener('mouseup', showSelectionOnceItSettles)
    document.addEventListener('mousedown', hideUnlessOnToolbar)
    document.addEventListener('keydown', hideOnEscape)
    document.addEventListener('scroll', hide, true)
    return () => {
      document.removeEventListener('mouseup', showSelectionOnceItSettles)
      document.removeEventListener('mousedown', hideUnlessOnToolbar)
      document.removeEventListener('keydown', hideOnEscape)
      document.removeEventListener('scroll', hide, true)
    }
  }, [containerRef])

  function clearSelection() {
    window.getSelection()?.removeAllRanges()
    setSelection(undefined)
  }

  return { selection, clearSelection }
}
