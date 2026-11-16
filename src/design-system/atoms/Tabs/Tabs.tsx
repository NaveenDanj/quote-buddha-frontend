import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { Icon, type IconName } from '@ds/atoms/Icon'

export type TabItem = {
  value: string
  label: string
  icon?: IconName
  panel: ReactNode
}

type TabsProps = {
  label: string
  tabs: TabItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

// Which tab shows first when the parent does not control the choice.
function getStartTab(tabs: TabItem[], defaultValue: string | undefined): string | undefined {
  if (defaultValue !== undefined) {
    return defaultValue
  }
  return tabs[0]?.value
}

const tabClass = clsx(
  '-mb-px inline-flex cursor-pointer items-center gap-2 border-0 border-b-2 border-transparent bg-transparent py-2',
  'font-ui text-ui font-medium text-text-muted',
  'data-[state=active]:border-text data-[state=active]:text-text',
  // In Windows high contrast mode colors are replaced, so the active tab gets a thicker line.
  'forced-colors:data-[state=active]:border-b-4',
  'enabled:hover:text-text disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
)

export function Tabs({ label, tabs, value, defaultValue, onValueChange }: TabsProps) {
  const startValue = value === undefined ? getStartTab(tabs, defaultValue) : undefined

  return (
    <RadixTabs.Root value={value} defaultValue={startValue} onValueChange={onValueChange}>
      <RadixTabs.List aria-label={label} className="flex flex-wrap gap-5 border-b border-border">
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.value} value={tab.value} className={tabClass}>
            {tab.icon ? <Icon name={tab.icon} size="small" /> : null}
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content key={tab.value} value={tab.value} className="pt-4">
          {tab.panel}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
