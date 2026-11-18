import { useNavigate } from 'react-router'
import { getChatTitleFromQuestion } from '@domain'
import { useCreateChatMutation, useCreateTurnMutation } from '@api/chats'
import { getChatPath } from '@pages/routes'
import { useComposerDraft } from '@pages/useComposerDraft'

// The first question starts a chat. The conversation page then finds the waiting question and asks it.
export function useNewQuestion() {
  const navigate = useNavigate()
  const [createChat] = useCreateChatMutation()
  const [createTurn] = useCreateTurnMutation()
  const draft = useComposerDraft()

  async function sendQuestion(text: string) {
    const trimmedQuestion = text.trim()
    if (trimmedQuestion === '') {
      return
    }
    const chat = await createChat({ title: getChatTitleFromQuestion(trimmedQuestion) }).unwrap()
    await createTurn({ chatId: chat.id, question: trimmedQuestion, depth: draft.depth }).unwrap()
    navigate(getChatPath(chat.id))
  }

  return { ...draft, sendQuestion }
}
