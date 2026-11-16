import * as RadixHoverCard from '@radix-ui/react-hover-card'
import type { ReactElement, ReactNode } from 'react'
import { popupGapInPixels, popupSurfaceClass } from '@ds/atoms/popupLook'

const openDelayInMilliseconds = 300
const closeDelayInMilliseconds = 100

type HoverCardProps = {
  // The link or word that shows the card. It must be focusable, so keyboard users get the card too.
  trigger: ReactElement
  children: ReactNode
}

// A short preview that appears on hover or keyboard focus. It cannot be opened by touch, so the
// trigger must lead to the same information some other way (for example, it is a link to the full page).
export function HoverCard({ trigger, children }: HoverCardProps) {
  return (
    <RadixHoverCard.Root openDelay={openDelayInMilliseconds} closeDelay={closeDelayInMilliseconds}>
      <RadixHoverCard.Trigger asChild>{trigger}</RadixHoverCard.Trigger>
      <RadixHoverCard.Portal>
        <RadixHoverCard.Content
          sideOffset={popupGapInPixels}
          className={`${popupSurfaceClass} max-w-(--layout-panel) p-4 text-caption`}
        >
          {children}
        </RadixHoverCard.Content>
      </RadixHoverCard.Portal>
    </RadixHoverCard.Root>
  )
}
