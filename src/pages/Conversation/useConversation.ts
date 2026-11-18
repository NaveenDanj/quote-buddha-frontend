import { useEffect } from 'react'
import { AskScope, useAnswerStream } from '@api/ask'
import { useCreateTurnMutation, useFinishTurnMutation, useGetTurnsQuery } from '@api/chats'
import { isStreamFinished, StreamKind, type AnswerDepth, type Turn } from '@domain'

// The questions of one chat. The newest unanswered question is asked, and its answer is kept when it ends.
export function useConversation(chatId: string) {
  const { data: savedTurns } = useGetTurnsQuery(chatId)
  const [createTurn] = useCreateTurnMutation()
  const [finishTurn] = useFinishTurnMutation()
  const stream = useAnswerStream()

  const savedOrEmptyTurns = savedTurns ?? []
  const liveTurn = savedOrEmptyTurns.find((turn) => !isStreamFinished(turn.state))
  const { ask, reset, stop } = stream

  useEffect(() => {
    if (liveTurn && stream.state.kind === StreamKind.idle) {
      ask({
        question: liveTurn.question,
        depth: liveTurn.depth,
        scope: AskScope.earlyTexts,
        chatId,
      })
    }
  }, [liveTurn, stream.state.kind, ask, chatId])

  useEffect(() => {
    if (liveTurn && isStreamFinished(stream.state)) {
      finishTurn({ chatId, turnId: liveTurn.id, state: stream.state })
      reset()
    }
  }, [liveTurn, stream.state, finishTurn, reset, chatId])

  // The question that is being answered shows the stream. The others show what was kept.
  const turns: Turn[] = savedOrEmptyTurns.map((turn) =>
    turn.id === liveTurn?.id ? { ...turn, state: stream.state } : turn,
  )

  function sendQuestion(question: string, depth: AnswerDepth) {
    const trimmedQuestion = question.trim()
    if (trimmedQuestion === '' || liveTurn) {
      return
    }
    createTurn({ chatId, question: trimmedQuestion, depth })
  }

  return { turns, isStreaming: liveTurn !== undefined, sendQuestion, stop }
}
