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
  className?: string
  listClassName?: string
  contentClassName?: string
}

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
  'forced-colors:data-[state=active]:border-b-4',
  'enabled:hover:text-text disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)',
)

export function Tabs({
  label,
  tabs,
  value,
  defaultValue,
  onValueChange,
  className,
  listClassName,
  contentClassName,
}: TabsProps) {
  const startValue = value === undefined ? getStartTab(tabs, defaultValue) : undefined

  return (
    <RadixTabs.Root
      value={value}
      defaultValue={startValue}
      onValueChange={onValueChange}
      className={className}
    >
      <RadixTabs.List
        aria-label={label}
        className={clsx('flex flex-wrap gap-4 border-b border-border', listClassName)}
      >
        {tabs.map((tab) => (
          <RadixTabs.Trigger key={tab.value} value={tab.value} className={tabClass}>
            {tab.icon ? <Icon name={tab.icon} size="small" /> : null}
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.value}
          value={tab.value}
          className={clsx('pt-4', contentClassName)}
        >
          {tab.panel}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
