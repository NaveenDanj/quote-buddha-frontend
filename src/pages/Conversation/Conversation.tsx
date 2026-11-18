import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import type { Chat, FeedbackChoice, Turn } from '@domain'
import { useGetChatsQuery } from '@api/chats'
import type { AssistantMessageActions } from '@components/organisms/AssistantMessage'
import { SourceGraphDialog } from '@components/organisms/SourceGraphDialog'
import { ChatLayout } from '@templates/ChatLayout'
import { doNothingYet } from '@pages/doNothingYet'
import { AppPath } from '@pages/routes'
import { useComposerDraft } from '@pages/useComposerDraft'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import { ConversationComposer } from './ConversationComposer'
import { ConversationPanel } from './ConversationPanel'
import { ConversationTurn } from './ConversationTurn'
import { useConversation } from './useConversation'
import { useResearchSelection } from './useResearchSelection'

function ConversationView({ chat }: { chat: Chat }) {
  const navigate = useNavigate()
  const conversation = useConversation(chat.id)
  const research = useResearchSelection(conversation.turns)
  const draft = useComposerDraft()
  const [feedbackByTurnId, setFeedbackByTurnId] = useState<Record<string, FeedbackChoice>>({})

  function sendDraft() {
    conversation.sendQuestion(draft.question, draft.depth)
    draft.clearDraft()
  }

  function getActions(turn: Turn): AssistantMessageActions {
    return {
      onOpenSource: (citationId) => research.showSource(turn.id, citationId),
      onOpenGraph: () => research.openGraph(turn.id),
      onShowEvidence: () => research.showEvidence(turn.id),
      onShowCoverage: () => navigate(AppPath.newChat),
      onAskAgain: () => conversation.sendQuestion(turn.question, turn.depth),
      onChooseQuestion: (question) => conversation.sendQuestion(question, turn.depth),
      onChooseFeedback: (choice) => setFeedbackByTurnId({ ...feedbackByTurnId, [turn.id]: choice }),
      onCopy: doNothingYet,
      onSave: doNothingYet,
      onOpenReader: doNothingYet,
    }
  }

  const composer = (
    <ConversationComposer
      draft={draft}
      isStreaming={conversation.isStreaming}
      onSend={sendDraft}
      onStop={conversation.stop}
    />
  )

  return (
    <WorkspaceFrame
      title={chat.title}
      selectedChatId={chat.id}
      panel={research.isPanelOpen ? <ConversationPanel research={research} /> : undefined}
      onTogglePanel={research.togglePanel}
      onClosePanel={research.closePanel}
    >
      <ChatLayout composer={composer}>
        {conversation.turns.map((turn) => (
          <ConversationTurn
            key={turn.id}
            turn={turn}
            actions={getActions(turn)}
            feedbackChoice={feedbackByTurnId[turn.id]}
          />
        ))}
      </ChatLayout>
      {research.answer ? (
        <SourceGraphDialog
          answer={research.answer}
          isOpen={research.isGraphOpen}
          onOpenChange={research.setIsGraphOpen}
        />
      ) : null}
    </WorkspaceFrame>
  )
}

export function Conversation() {
  const { chatId } = useParams()
  const { data: chats } = useGetChatsQuery()
  const chat = chats?.find((candidate) => candidate.id === chatId)

  if (!chat) {
    return <Navigate to={AppPath.newChat} replace />
  }
  return <ConversationView chat={chat} />
}
