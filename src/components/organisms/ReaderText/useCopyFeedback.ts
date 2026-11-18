import { useEffect, useRef, useState } from 'react'

const feedbackDurationInMilliseconds = 1500

// Copies text and remembers for a moment which button did it, so that button can show a check mark.
export function useCopyFeedback() {
  const [copiedKey, setCopiedKey] = useState<string>()
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return
    }
    setCopiedKey(key)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setCopiedKey(undefined), feedbackDurationInMilliseconds)
  }

  return { copiedKey, copy }
}
