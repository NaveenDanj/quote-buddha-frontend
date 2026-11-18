import { useId, type ReactNode } from 'react'
import { CardButton } from '@ds/atoms/CardButton'
import { LinkButton } from '@ds/atoms/LinkButton'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { SuggestionChips } from '@components/molecules/SuggestionChips'

export type HeroTool = {
  title: string
  description: string
  onOpen: () => void
}

export type HeroChat = {
  id: string
  title: string
  onOpen: () => void
}

type NewChatHeroProps = {
  // The composer, built by the page, so this component never needs to know how a question is sent.
  composer: ReactNode
  suggestions: string[]
  onChooseSuggestion: (suggestion: string) => void
  tools: HeroTool[]
  recentChats: HeroChat[]
  // How much of the early texts the database covers, for example a CoverageStrip.
  coverage: ReactNode
}

function ToolCards({ tools }: { tools: HeroTool[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(var(--layout-tool-card),1fr))] gap-block">
      {tools.map((tool) => (
        <CardButton
          key={tool.title}
          onClick={tool.onOpen}
          className="gap-related border-border bg-transparent px-card py-card-tight text-text hover:border-text"
        >
          <Text variant="ui" weight="medium" as="span">
            {tool.title}
          </Text>
          <Text variant="caption" isMuted>
            {tool.description}
          </Text>
        </CardButton>
      ))}
    </div>
  )
}

function RecentChats({ chats }: { chats: HeroChat[] }) {
  const headingId = useId()

  if (chats.length === 0) {
    return <div />
  }

  return (
    <section aria-labelledby={headingId} className="grid content-start gap-group">
      <Text variant="label" as="h2" id={headingId} isMuted>
        {wording.continueHeading}
      </Text>
      <ul className="grid list-none gap-related">
        {chats.map((chat) => (
          <li key={chat.id}>
            <LinkButton onClick={chat.onOpen} className="w-full py-group">
              {chat.title}
            </LinkButton>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CoverageSection({ coverage }: { coverage: ReactNode }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="grid content-start gap-block">
      <Text variant="label" as="h2" id={headingId} isMuted>
        {wording.coverageHeading}
      </Text>
      {coverage}
      <Text variant="caption" as="p" isMuted>
        {wording.coverageNote}
      </Text>
    </section>
  )
}

export function NewChatHero({
  composer,
  suggestions,
  onChooseSuggestion,
  tools,
  recentChats,
  coverage,
}: NewChatHeroProps) {
  return (
    <div className="mx-auto grid min-h-full w-full max-w-(--layout-hero-column) content-center gap-page px-(--gutter) py-area">
      <Text variant="display" as="h1" className="text-center">
        {wording.newChatHeading}
      </Text>
      <div className="mx-auto w-full max-w-(--layout-composer)">{composer}</div>
      <SuggestionChips
        label={wording.exampleQuestionsLabel}
        suggestions={suggestions}
        onChoose={onChooseSuggestion}
        isCentered
      />
      <ToolCards tools={tools} />
      <div className="grid gap-page md:grid-cols-2">
        <RecentChats chats={recentChats} />
        <CoverageSection coverage={coverage} />
      </div>
    </div>
  )
}
