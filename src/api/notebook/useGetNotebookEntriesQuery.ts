import { useSyncExternalStore } from 'react'
import type { NotebookEntry, ReaderNote } from '@domain'
import { sortNewestFirst } from '@domain'
import { useGetNotesQuery } from '@api/notes'
import { sampleDn1Sections } from '@api/reader/readerFixtures'
import { getFreeNotes, subscribeToFreeNotes, type FreeNote } from './freeNoteStore'

type GetNotebookEntriesResult = {
  data: NotebookEntry[] | undefined
  isLoading: boolean
  isError: boolean
}

function findQuote(citationId: string): string | undefined {
  for (const section of sampleDn1Sections) {
    const paragraph = section.paragraphs.find((candidate) => candidate.citationId === citationId)
    if (paragraph) {
      return paragraph.translationText
    }
  }
  return undefined
}

function fromReaderNote(note: ReaderNote): NotebookEntry {
  return {
    id: note.id,
    createdAtInMilliseconds: note.createdAtInMilliseconds,
    text: note.text,
    isAiEnhanced: note.isAiEnhanced,
    originalText: note.originalText,
    passage: {
      citationId: note.citationId,
      label: `DN 1 · ${note.paragraphId}`,
      quote: findQuote(note.citationId),
    },
  }
}

function fromFreeNote(note: FreeNote): NotebookEntry {
  return { ...note, isAiEnhanced: false }
}

// Same name and result shape as an RTK Query hook. The Notebook shows the notes written in the Reader and the ones
// written in the Notebook itself, the newest first.
export function useGetNotebookEntriesQuery(): GetNotebookEntriesResult {
  const { data: readerNotes } = useGetNotesQuery()
  const freeNotes = useSyncExternalStore(subscribeToFreeNotes, getFreeNotes)

  const entries = [...(readerNotes ?? []).map(fromReaderNote), ...freeNotes.map(fromFreeNote)]
  return { data: sortNewestFirst(entries), isLoading: false, isError: false }
}
