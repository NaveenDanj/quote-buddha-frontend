import type { Chat } from '@domain'
import { removeTurns } from './turnStore'

let chats: Chat[] = []
const listeners = new Set<() => void>()

function tellListeners() {
  listeners.forEach((listener) => listener())
}

export function getChats(): Chat[] {
  return chats
}

export function addChat(title: string): Chat {
  const chat: Chat = {
    id: crypto.randomUUID(),
    title,
    createdAtInMilliseconds: Date.now(),
    isPinned: false,
  }
  chats = [...chats, chat]
  tellListeners()
  return chat
}

export function setChatPinned(chatId: string, isPinned: boolean) {
  chats = chats.map((chat) => (chat.id === chatId ? { ...chat, isPinned } : chat))
  tellListeners()
}

export function removeChat(chatId: string) {
  chats = chats.filter((chat) => chat.id !== chatId)
  removeTurns(chatId)
  tellListeners()
}

export function subscribeToChats(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function clearChats() {
  chats = []
  tellListeners()
}
