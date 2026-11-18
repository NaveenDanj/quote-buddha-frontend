import { useState } from 'react'
import type { Clarification } from '@domain'
import { useClarifyPassageMutation } from '@api/readerAssist'

type ClarifyTarget = {
  paragraphId?: string
  getCitationId: (paragraphId: string) => string | undefined
  sectionNumber: number
  sectionTitle: string
}

type ClarifiedParagraph = {
  paragraphId: string
  clarification: Clarification
}

// Asks the system to explain a paragraph. The explanation belongs to the paragraph it was asked for,
// so it is not shown on another one.
export function useReaderClarify(target: ClarifyTarget) {
  const [clarifyPassage, { isLoading }] = useClarifyPassageMutation()
  const [result, setResult] = useState<ClarifiedParagraph>()

  async function clarify(paragraphId = target.paragraphId) {
    const citationId = paragraphId ? target.getCitationId(paragraphId) : undefined
    if (!paragraphId || !citationId) {
      return
    }
    const clarification = await clarifyPassage({
      paragraphId,
      citationId,
      sectionNumber: target.sectionNumber,
      sectionTitle: target.sectionTitle,
    }).unwrap()
    setResult({ paragraphId, clarification })
  }

  const isForThisParagraph = result?.paragraphId === target.paragraphId

  return {
    isClarifying: isLoading,
    clarification: isForThisParagraph ? result?.clarification : undefined,
    clarify,
  }
}
