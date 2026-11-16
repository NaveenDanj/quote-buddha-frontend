import * as RadixTabs from '@radix-ui/react-tabs'
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

export function Tabs({ label, tabs, value, defaultValue, onValueChange }: TabsProps) {
  const firstValue = tabs[0]?.value
  const startValue = value === undefined ? (defaultValue ?? firstValue) : undefined

  return (
    <RadixTabs.Root value={value} defaultValue={startValue} onValueChange={onValueChange}>
      <RadixTabs.List aria-label={label} className="flex flex-wrap gap-4 border-b border-border">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className={
              '-mb-px inline-flex cursor-pointer items-center gap-2 border-0 border-b-2 border-transparent bg-transparent py-2 ' +
              'font-ui text-ui font-medium text-text-muted ' +
              'data-[state=active]:border-text data-[state=active]:text-text ' +
              'enabled:hover:text-text disabled:cursor-not-allowed disabled:opacity-35'
            }
          >
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
