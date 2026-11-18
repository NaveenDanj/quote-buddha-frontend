import { useState } from 'react'
import { useEnhanceNoteMutation } from '@api/notes'

// The note being written, and the system's suggestion for it. A suggestion only goes into the box when the
// person accepts it, and what they wrote first is kept so the saved note can show it.
export function useNoteDraft(paragraphId: string | undefined) {
  const [enhanceNote, { isLoading: isEnhancing }] = useEnhanceNoteMutation()
  const [draft, setDraft] = useState('')
  const [suggestion, setSuggestion] = useState<string>()
  const [originalText, setOriginalText] = useState<string>()

  async function enhance() {
    if (!paragraphId) {
      return
    }
    setSuggestion(await enhanceNote({ text: draft, paragraphId }).unwrap())
  }

  function acceptSuggestion() {
    if (suggestion === undefined) {
      return
    }
    setOriginalText(draft)
    setDraft(suggestion)
    setSuggestion(undefined)
  }

  function discardSuggestion() {
    setSuggestion(undefined)
  }

  function clearDraft() {
    setDraft('')
    setSuggestion(undefined)
    setOriginalText(undefined)
  }

  return {
    draft,
    setDraft,
    suggestion,
    originalText,
    isEnhancing,
    enhance,
    acceptSuggestion,
    discardSuggestion,
    clearDraft,
  }
}
