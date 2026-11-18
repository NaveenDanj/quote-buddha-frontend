import { StreamKind, type AnswerDepth, type StreamState, type Turn } from '@domain'

const noTurns: Turn[] = []
let turnsByChatId: Record<string, Turn[]> = {}
const listeners = new Set<() => void>()

function tellListeners() {
  listeners.forEach((listener) => listener())
}

export function getTurns(chatId: string): Turn[] {
  return turnsByChatId[chatId] ?? noTurns
}

export function addTurn(chatId: string, question: string, depth: AnswerDepth): Turn {
  const turn: Turn = { id: crypto.randomUUID(), question, depth, state: { kind: StreamKind.idle } }
  turnsByChatId = { ...turnsByChatId, [chatId]: [...getTurns(chatId), turn] }
  tellListeners()
  return turn
}

export function finishTurn(chatId: string, turnId: string, state: StreamState) {
  const turns = getTurns(chatId).map((turn) => (turn.id === turnId ? { ...turn, state } : turn))
  turnsByChatId = { ...turnsByChatId, [chatId]: turns }
  tellListeners()
}

export function removeTurns(chatId: string) {
  const otherEntries = Object.entries(turnsByChatId).filter(([id]) => id !== chatId)
  turnsByChatId = Object.fromEntries(otherEntries)
  tellListeners()
}

export function subscribeToTurns(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function clearTurns() {
  turnsByChatId = {}
  tellListeners()
}
