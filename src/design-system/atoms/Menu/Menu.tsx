import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import type { ReactElement } from 'react'
import { popupGapInPixels, popupSurfaceClass } from '@ds/atoms/popupLook'
import { Icon, type IconName } from '@ds/atoms/Icon'

export type MenuItem = {
  label: string
  icon?: IconName
  onSelect: () => void
}

type MenuProps = {
  // The button that opens the menu, for example an IconButton. It must pass its ref on (the atoms do).
  trigger: ReactElement
  items: MenuItem[]
}

// A popup menu. Radix handles the arrow keys, Home and End, type-to-jump, Escape, and focus return.
export function Menu({ trigger, items }: MenuProps) {
  return (
    <RadixMenu.Root>
      <RadixMenu.Trigger asChild>{trigger}</RadixMenu.Trigger>
      <RadixMenu.Portal>
        <RadixMenu.Content
          align="end"
          sideOffset={popupGapInPixels}
          className={`${popupSurfaceClass} min-w-(--menu-min-width) py-1`}
        >
          {items.map((item) => (
            <RadixMenu.Item
              key={item.label}
              onSelect={item.onSelect}
              className="flex cursor-pointer items-center gap-3 px-3 py-2 font-ui text-ui text-text -outline-offset-2 data-[highlighted]:bg-surface-subtle"
            >
              {item.icon ? <Icon name={item.icon} size="small" /> : null}
              {item.label}
            </RadixMenu.Item>
          ))}
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  )
}
