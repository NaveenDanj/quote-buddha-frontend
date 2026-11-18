import type { ReactNode } from 'react'
import { Surface, SurfaceSpace } from '@ds/atoms/Surface'
import { wording } from '@wording'

type ChatLayoutProps = {
  // The messages. They scroll. The composer under them does not.
  children: ReactNode
  composer: ReactNode
}

export function ChatLayout({ children, composer }: ChatLayoutProps) {
  return (
    <Surface className="min-h-0 grid-rows-[minmax(0,1fr)_auto]">
      <Surface className="relative min-h-0 overflow-y-auto">
        <Surface
          as="section"
          aria-label={wording.conversationLabel}
          gap={SurfaceSpace.large}
          className="mx-auto w-full max-w-(--layout-chat-column) content-start px-(--gutter) py-6"
        >
          {children}
        </Surface>
      </Surface>
      <Surface className="bg-page px-(--gutter) pt-2 pb-4">
        <Surface className="mx-auto w-full max-w-(--layout-chat-column)">{composer}</Surface>
      </Surface>
    </Surface>
  )
}
