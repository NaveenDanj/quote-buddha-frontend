import type { ReactNode } from 'react'
import { Surface, SurfaceRows, SurfaceSpace } from '@ds/atoms/Surface'
import { wording } from '@wording'

type ChatLayoutProps = {
  children: ReactNode
  composer: ReactNode
}

export function ChatLayout({ children, composer }: ChatLayoutProps) {
  return (
    <Surface rows={SurfaceRows.fillThenFooter} className="min-h-0">
      <Surface isScrollArea>
        <Surface
          as="section"
          aria-label={wording.conversationLabel}
          gap={SurfaceSpace.large}
          className="mx-auto w-full max-w-(--layout-chat-column) content-start px-(--gutter) py-area"
        >
          {children}
        </Surface>
      </Surface>
      <Surface className="bg-page px-(--gutter) pt-group pb-card">
        <Surface className="mx-auto w-full max-w-(--layout-chat-column)">{composer}</Surface>
      </Surface>
    </Surface>
  )
}
