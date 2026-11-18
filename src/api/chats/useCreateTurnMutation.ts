import type { AnswerDepth, Turn } from '@domain'
import { addTurn } from './turnStore'

type CreateTurnRequest = {
  chatId: string
  question: string
  depth: AnswerDepth
}

type CreateTurnCall = {
  unwrap: () => Promise<Turn>
}

function createTurn(request: CreateTurnRequest): CreateTurnCall {
  const turn = addTurn(request.chatId, request.question, request.depth)
  return { unwrap: () => Promise.resolve(turn) }
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useCreateTurnMutation(): [typeof createTurn, { isLoading: boolean }] {
  return [createTurn, { isLoading: false }]
}
