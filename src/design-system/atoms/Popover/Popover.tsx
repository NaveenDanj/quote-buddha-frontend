import * as RadixPopover from '@radix-ui/react-popover'
import type { ReactElement, ReactNode } from 'react'
import { popupGapInPixels, popupSurfaceClass } from '@ds/atoms/popupLook'

type PopoverProps = {
  // The button that opens the panel. It must pass its ref on (the atoms do).
  trigger: ReactElement
  // Names the panel for screen readers, for example "Reading settings".
  label: string
  children: ReactNode
}

// A small panel anchored to its trigger. It closes with Escape or a click outside, and focus returns to the trigger.
export function Popover({ trigger, label, children }: PopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          aria-label={label}
          sideOffset={popupGapInPixels}
          className={`${popupSurfaceClass} max-w-(--layout-panel) p-4 text-ui`}
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
