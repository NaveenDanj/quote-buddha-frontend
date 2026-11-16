import { useId, type ReactNode } from 'react'
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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(var(--layout-tool-card),1fr))] gap-3">
      {tools.map((tool) => (
        <button
          key={tool.title}
          type="button"
          onClick={tool.onOpen}
          className="grid cursor-pointer gap-1 rounded border border-border bg-transparent px-4 py-3 text-left text-text hover:border-text"
        >
          <span className="font-ui text-ui font-medium">{tool.title}</span>
          <span className="font-ui text-caption text-text-muted">{tool.description}</span>
        </button>
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
    <section aria-labelledby={headingId} className="grid content-start gap-2">
      <Text variant="label" as="h2" id={headingId} className="text-text-muted">
        {wording.continueHeading}
      </Text>
      <ul className="m-0 grid list-none gap-1 p-0">
        {chats.map((chat) => (
          <li key={chat.id}>
            <button
              type="button"
              onClick={chat.onOpen}
              className="w-full cursor-pointer border-0 bg-transparent px-0 py-2 text-left font-ui text-ui text-text underline decoration-1 underline-offset-4 hover:text-accent"
            >
              {chat.title}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CoverageSection({ coverage }: { coverage: ReactNode }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="grid content-start gap-3">
      <Text variant="label" as="h2" id={headingId} className="text-text-muted">
        {wording.coverageHeading}
      </Text>
      {coverage}
      <Text variant="caption" as="p" className="text-text-muted">
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
    <div className="mx-auto grid min-h-full w-full max-w-(--layout-hero-column) content-center gap-5 px-(--gutter) py-6">
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
      <div className="grid gap-5 md:grid-cols-2">
        <RecentChats chats={recentChats} />
        <CoverageSection coverage={coverage} />
      </div>
    </div>
  )
}
