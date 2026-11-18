import * as RadixMenu from '@radix-ui/react-dropdown-menu'
import type { ReactElement } from 'react'
import { popupGapInPixels, popupSurfaceClass } from '@ds/atoms/popupLook'
import { Icon, type IconName } from '@ds/atoms/Icon'

export type MenuItem = {
  label: string
  icon?: IconName
  // Says why the item cannot be used. The words are shown and the item does nothing.
  unavailableReason?: string
  onSelect: () => void
}

type MenuProps = {
  trigger: ReactElement
  items: MenuItem[]
}

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
              disabled={item.unavailableReason !== undefined}
              className="flex cursor-pointer items-center gap-3 px-3 py-2 font-ui text-ui text-text focus-ring-inset data-[disabled]:cursor-not-allowed data-[disabled]:text-text-muted data-[highlighted]:bg-surface-subtle"
            >
              {item.icon ? <Icon name={item.icon} size="small" /> : null}
              {item.label}
              {item.unavailableReason ? (
                <span className="font-ui text-caption">{item.unavailableReason}</span>
              ) : null}
            </RadixMenu.Item>
          ))}
        </RadixMenu.Content>
      </RadixMenu.Portal>
    </RadixMenu.Root>
  )
}
