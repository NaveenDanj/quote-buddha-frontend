import { useNavigate } from 'react-router'
import { Text } from '@ds/atoms/Text'
import type { Chat } from '@domain'
import { coverageSummaryText, wording } from '@wording'
import { useGetChatsQuery } from '@api/chats'
import { useGetCoverageQuery } from '@api/coverage'
import { CoverageStrip } from '@components/molecules/CoverageStrip'
import { Composer } from '@components/organisms/Composer'
import { NewChatHero, type HeroChat, type HeroTool } from '@components/organisms/NewChatHero'
import { doNothingYet } from '@pages/doNothingYet'
import { getChatPath } from '@pages/routes'
import { WorkspaceFrame } from '@pages/WorkspaceFrame'
import {
  openTool,
  openToolFromCommand,
  slashCommands,
  toolCardDefinitions,
} from '@pages/workspaceTools'
import { CenteredHeroLayout } from '@templates/CenteredHeroLayout'
import { useNewQuestion } from './useNewQuestion'

const recentChatCount = 3
const suggestedQuestions = [wording.suggestionSelfQuestion, wording.suggestionWrongViewsQuestion]

function toHeroTools(goTo: (path: string) => void): HeroTool[] {
  return toolCardDefinitions.map((tool) => ({
    title: tool.title,
    description: tool.description,
    onOpen: () => openTool(tool.id, goTo),
  }))
}

function toRecentChats(chats: Chat[], onOpenChat: (chatId: string) => void): HeroChat[] {
  const newestChatsFirst = [...chats].reverse()
  return newestChatsFirst.slice(0, recentChatCount).map((chat) => ({
    id: chat.id,
    title: chat.title,
    onOpen: () => onOpenChat(chat.id),
  }))
}

export function NewChat() {
  const navigate = useNavigate()
  const { data: chats } = useGetChatsQuery()
  const { data: coverage } = useGetCoverageQuery()
  const newQuestion = useNewQuestion()

  const tools = toHeroTools(navigate)
  const recentChats = toRecentChats(chats ?? [], (chatId) => navigate(getChatPath(chatId)))

  return (
    <WorkspaceFrame title={wording.newChatLabel}>
      <CenteredHeroLayout
        footer={
          <Text variant="caption" as="p" isMuted>
            {wording.answersCanBeWrong}
          </Text>
        }
      >
        <NewChatHero
          composer={
            <Composer
              value={newQuestion.question}
              onValueChange={newQuestion.setQuestion}
              depth={newQuestion.depth}
              onDepthChange={newQuestion.setDepth}
              isStreaming={false}
              onSend={() => newQuestion.sendQuestion(newQuestion.question)}
              onStop={doNothingYet}
              attachedFiles={newQuestion.attachedFiles}
              onAttachFiles={newQuestion.attachFiles}
              onRemoveFile={newQuestion.removeFile}
              onRemoveContext={doNothingYet}
              commands={slashCommands}
              onRunCommand={(command) => {
                newQuestion.setQuestion('')
                openToolFromCommand(command, navigate)
              }}
            />
          }
          suggestions={suggestedQuestions}
          onChooseSuggestion={newQuestion.sendQuestion}
          tools={tools}
          recentChats={recentChats}
          coverage={
            coverage ? (
              <CoverageStrip
                title={wording.dighaNikayaLabel}
                summary={coverageSummaryText(coverage.includedCount, coverage.totalCount)}
                includedCount={coverage.includedCount}
                totalCount={coverage.totalCount}
              />
            ) : null
          }
        />
      </CenteredHeroLayout>
    </WorkspaceFrame>
  )
}
