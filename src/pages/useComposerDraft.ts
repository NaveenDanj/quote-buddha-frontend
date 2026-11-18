import { useState } from 'react'
import { AnswerDepth } from '@domain'
import type { AttachedFile } from '@components/organisms/Composer'

// What the person is putting together in the composer before they send it.
export function useComposerDraft() {
  const [question, setQuestion] = useState('')
  const [depth, setDepth] = useState<AnswerDepth>(AnswerDepth.quick)
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])

  function attachFiles(files: File[]) {
    const newFiles = files.map((file) => ({ id: crypto.randomUUID(), name: file.name }))
    setAttachedFiles([...attachedFiles, ...newFiles])
  }

  function removeFile(fileId: string) {
    setAttachedFiles(attachedFiles.filter((file) => file.id !== fileId))
  }

  function clearDraft() {
    setQuestion('')
    setAttachedFiles([])
  }

  return {
    question,
    setQuestion,
    depth,
    setDepth,
    attachedFiles,
    attachFiles,
    removeFile,
    clearDraft,
  }
}
