import { ListRow } from '@ds/atoms/ListRow'
import { Text } from '@ds/atoms/Text'
import type { SourceUse } from '@domain'
import { usedTimesText, wording } from '@wording'

export type NotebookChat = {
  id: string
  title: string
}

type NotebookAsideProps = {
  chats: NotebookChat[]
  onOpenChat: (chatId: string) => void
  sources: SourceUse[]
  onOpenSource: (citationId: string) => void
}

const listClass = 'grid list-none border-t border-border'

export function NotebookAside({ chats, onOpenChat, sources, onOpenSource }: NotebookAsideProps) {
  return (
    <>
      <section className="grid gap-group">
        <Text variant="label" as="h2">
          {wording.chatsLabel}
        </Text>
        {chats.length === 0 ? (
          <Text variant="caption" as="p" isMuted>
            {wording.noChatsTitle}
          </Text>
        ) : (
          <ul className={listClass}>
            {chats.map((chat) => (
              <ListRow key={chat.id} onClick={() => onOpenChat(chat.id)}>
                {chat.title}
              </ListRow>
            ))}
          </ul>
        )}
      </section>
      <section className="grid gap-group">
        <Text variant="label" as="h2">
          {wording.sourcesUsedLabel}
        </Text>
        {sources.length === 0 ? (
          <Text variant="caption" as="p" isMuted>
            {wording.noSourcesUsedYetText}
          </Text>
        ) : (
          <ul className={listClass}>
            {sources.map((source) => (
              <ListRow
                key={source.citationId}
                onClick={() => onOpenSource(source.citationId)}
                trailing={
                  <Text variant="codeSmall" isMuted className="whitespace-nowrap">
                    {usedTimesText(source.useCount)}
                  </Text>
                }
              >
                <Text variant="code" weight="medium">
                  {source.label}
                </Text>
              </ListRow>
            ))}
          </ul>
        )}
      </section>
      <Text variant="caption" as="p" isMuted>
        {wording.notebookExportNote}
      </Text>
    </>
  )
}
