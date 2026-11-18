import type { MouseEvent, ReactNode } from 'react'
import { HoverCard } from '@ds/atoms/HoverCard'
import { VisuallyHidden } from '@ds/atoms/VisuallyHidden'
import { TextLanguage } from '@domain'

type TermLinkProps = {
  pali: string
  gloss: string
  href: string
  onOpen?: (pali: string) => void
  children: ReactNode
}

export function TermLink({ pali, gloss, href, onOpen, children }: TermLinkProps) {
  function openTerm(event: MouseEvent<HTMLAnchorElement>) {
    if (!onOpen) {
      return
    }
    event.preventDefault()
    onOpen(pali)
  }

  return (
    <HoverCard
      trigger={
        <a
          href={href}
          onClick={openTerm}
          className="border-b border-dotted border-text-muted text-inherit no-underline hover:border-accent hover:text-accent"
        >
          {children}
          <VisuallyHidden>{`, ${gloss}`}</VisuallyHidden>
        </a>
      }
    >
      <span lang={TextLanguage.pali} className="font-medium">
        {pali}
      </span>
      <span>{`: ${gloss}`}</span>
    </HoverCard>
  )
}
