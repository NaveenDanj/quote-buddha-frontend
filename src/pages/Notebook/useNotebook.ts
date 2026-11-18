import { useState } from 'react'
import { getSourcesUsed } from '@domain'
import { useGetChatsQuery } from '@api/chats'
import { useCreateFreeNoteMutation, useGetNotebookEntriesQuery } from '@api/notebook'
import { saveTextFile } from '@pages/saveTextFile'
import { wording } from '@wording'
import { buildNotebookBibtex, buildNotebookMarkdown } from './buildNotebookExports'

const markdownFileName = 'notebook.md'
const bibtexFileName = 'notebook.bib'

// What the Notebook page needs: the notes, the chats and sources beside them, the note being written, and the exports.
export function useNotebook() {
  const { data: entries } = useGetNotebookEntriesQuery()
  const { data: chats } = useGetChatsQuery()
  const [createFreeNote] = useCreateFreeNoteMutation()
  const [draft, setDraft] = useState('')

  const allEntries = entries ?? []
  const sources = getSourcesUsed(allEntries)
  const newestChatsFirst = [...(chats ?? [])].reverse()

  function saveDraft() {
    const text = draft.trim()
    if (text) {
      createFreeNote(text)
      setDraft('')
    }
  }

  function exportMarkdown() {
    const markdown = buildNotebookMarkdown(wording.sampleNotebookTitle, allEntries, Date.now())
    saveTextFile(markdownFileName, markdown, 'text/markdown')
  }

  function exportBibtex() {
    saveTextFile(bibtexFileName, buildNotebookBibtex(sources), 'application/x-bibtex')
  }

  return {
    title: wording.sampleNotebookTitle,
    entries: allEntries,
    sources,
    chats: newestChatsFirst,
    draft,
    setDraft,
    saveDraft,
    exportMarkdown,
    exportBibtex,
  }
}
