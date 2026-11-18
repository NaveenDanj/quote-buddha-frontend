import { useState } from 'react'

const pretendEnhanceDurationInMilliseconds = 500

type EnhanceNoteRequest = {
  text: string
  paragraphId: string
}

type EnhanceNoteTriggerResult = {
  unwrap: () => Promise<string>
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// The backend has no POST /notes/enhance yet. This writes a plain sample suggestion, so the page can show how
// a suggestion from the system is labelled. The person always keeps their original.
export function useEnhanceNoteMutation(): [
  (request: EnhanceNoteRequest) => EnhanceNoteTriggerResult,
  { isLoading: boolean },
] {
  const [isLoading, setIsLoading] = useState(false)

  async function runEnhance(request: EnhanceNoteRequest): Promise<string> {
    setIsLoading(true)
    await wait(pretendEnhanceDurationInMilliseconds)
    setIsLoading(false)
    return `Clarified: ${request.text.trim()} In context, this refers to passage ${request.paragraphId}.`
  }

  function enhanceNote(request: EnhanceNoteRequest): EnhanceNoteTriggerResult {
    const pendingSuggestion = runEnhance(request)
    return { unwrap: () => pendingSuggestion }
  }

  return [enhanceNote, { isLoading }]
}
