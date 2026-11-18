import { useState } from 'react'
import { getNextReadingSize, useReadingSize } from '@ds/tokens/readingSize'
import { ReaderAction, ReaderTab, ReadingView, getTabForAction } from '@domain'
import { AppPath } from '@pages/routes'
import { useReaderPosition } from './useReaderPosition'

// The side pane sits beside the text when the window is at least as wide as the large breakpoint.
// On a narrower window it is a drawer, so it starts closed.
function isWideWindow(): boolean {
  const largeBreakpoint = getComputedStyle(document.documentElement).getPropertyValue(
    '--breakpoint-lg',
  )
  return window.matchMedia(`(min-width: ${largeBreakpoint.trim()})`).matches
}

// What the Reader page needs: where we are, how the text is shown, which panes are open and which tab is showing.
export function useReader() {
  const position = useReaderPosition()
  const [view, setView] = useState<ReadingView>(ReadingView.both)
  const [isOutlineOpen, setIsOutlineOpen] = useState(true)
  const [isSideOpen, setIsSideOpen] = useState(isWideWindow)
  const [activeTab, setActiveTab] = useState<ReaderTab>(ReaderTab.notes)
  // The words the reader selected. They narrow what notes, explanations and questions are about.
  const [selectedText, setSelectedText] = useState<string>()
  const { readingSize, setReadingSize } = useReadingSize()

  // Choosing a paragraph by itself drops any selected words from before.
  function selectParagraph(paragraphId: string) {
    position.setSelectedParagraphId(paragraphId)
    setSelectedText(undefined)
  }

  function openTab(tab: ReaderTab) {
    setActiveTab(tab)
    setIsSideOpen(true)
  }

  // A button on a paragraph, or the toolbar over selected words: select what it is about and open its tab.
  function startAction(action: ReaderAction, paragraphId: string, words?: string) {
    position.setSelectedParagraphId(paragraphId)
    setSelectedText(words)
    openTab(getTabForAction(action))
  }

  function getParagraphLink(citationId: string): string {
    return `${window.location.origin}${AppPath.reader}#${citationId}`
  }

  return {
    ...position,
    setSelectedParagraphId: selectParagraph,
    view,
    setView,
    isOutlineOpen,
    toggleOutline: () => setIsOutlineOpen(!isOutlineOpen),
    isSideOpen,
    toggleSide: () => setIsSideOpen(!isSideOpen),
    closeSide: () => setIsSideOpen(false),
    activeTab,
    setActiveTab,
    openTab,
    selectedText,
    startAction,
    changeTextSize: () => setReadingSize(getNextReadingSize(readingSize)),
    getParagraphLink,
  }
}
