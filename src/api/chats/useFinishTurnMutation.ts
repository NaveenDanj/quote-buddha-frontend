import type { StreamState } from '@domain'
import { finishTurn } from './turnStore'

type FinishTurnRequest = {
  chatId: string
  turnId: string
  state: StreamState
}

function saveFinishedTurn(request: FinishTurnRequest) {
  finishTurn(request.chatId, request.turnId, request.state)
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useFinishTurnMutation(): [typeof saveFinishedTurn, { isLoading: boolean }] {
  return [saveFinishedTurn, { isLoading: false }]
}
