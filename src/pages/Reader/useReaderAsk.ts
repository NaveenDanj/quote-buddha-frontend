import { useState } from 'react'
import type { PassageQuestion } from '@domain'
import { useAskAboutPassageMutation } from '@api/readerAssist'

type AskTarget = {
  paragraphId?: string
  getCitationId: (paragraphId: string) => string | undefined
}

// The questions asked about passages, and the question being typed in the bar. A question shows as soon as it is
// asked, and its answer is filled in when it arrives.
export function useReaderAsk(target: AskTarget) {
  const [askAboutPassage] = useAskAboutPassageMutation()
  const [turns, setTurns] = useState<PassageQuestion[]>([])
  const [question, setQuestion] = useState('')

  async function ask(text: string) {
    const trimmedText = text.trim()
    const paragraphId = target.paragraphId
    const citationId = paragraphId ? target.getCitationId(paragraphId) : undefined
    if (!trimmedText || !paragraphId || !citationId) {
      return
    }
    const turnId = crypto.randomUUID()
    setTurns((current) => [...current, { id: turnId, question: trimmedText, paragraphId }])
    const answer = await askAboutPassage({
      question: trimmedText,
      paragraphId,
      citationId,
    }).unwrap()
    setTurns((current) => current.map((turn) => (turn.id === turnId ? { ...turn, answer } : turn)))
  }

  function submitQuestion() {
    const text = question
    setQuestion('')
    void ask(text)
  }

  return { turns, question, setQuestion, ask, submitQuestion }
}
