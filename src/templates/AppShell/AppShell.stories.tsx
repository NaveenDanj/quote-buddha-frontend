import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { wording } from '@wording'
import { answeredQuickAnswer } from '@api/fixtures'
import { Rail } from '@components/organisms/Rail'
import { ResearchPanel, ResearchTab } from '@components/organisms/ResearchPanel'
import { TopBar } from '@components/organisms/TopBar'
import { AppShell } from './AppShell'

const railId = 'rail-sample'

function SampleRail() {
  return (
    <Rail
      id={railId}
      groups={[
        {
          id: 'today',
          label: wording.todayLabel,
          chats: [{ id: '1', title: `${wording.sampleMarker}: a chat from today` }],
        },
      ]}
      selectedChatId="1"
      tools={[
        {
          id: 'reader',
          label: wording.navReaderLabel,
          icon: 'reader',
          isCurrent: false,
          onOpen: () => {},
        },
        {
          id: 'terms',
          label: wording.navTermsLabel,
          icon: 'terms',
          isCurrent: false,
          onOpen: () => {},
        },
      ]}
      footerText={`${wording.sampleMarker}: corpus line`}
      onNewChat={() => {}}
      onSearch={() => {}}
      onOpenChat={() => {}}
      getChatMenuItems={() => []}
      onOpenSettings={() => {}}
    />
  )
}

function SamplePanel({ onClose }: { onClose: () => void }) {
  return (
    <ResearchPanel
      answer={answeredQuickAnswer}
      activeTab={ResearchTab.sources}
      onTabChange={() => {}}
      onClose={onClose}
      onOpenInReader={() => {}}
      onOpenTerm={() => {}}
      notes={null}
    />
  )
}

type ShellExampleProps = {
  startsWithRailOpen?: boolean
  startsWithPanelOpen?: boolean
}

function ShellExample({
  startsWithRailOpen = false,
  startsWithPanelOpen = false,
}: ShellExampleProps) {
  const [isRailOpen, setIsRailOpen] = useState(startsWithRailOpen)
  const [isPanelOpen, setIsPanelOpen] = useState(startsWithPanelOpen)

  return (
    <AppShell
      rail={<SampleRail />}
      topBar={
        <TopBar
          title={`${wording.sampleMarker}: a chat title`}
          railId={railId}
          isRailOpen={isRailOpen}
          onToggleRail={() => setIsRailOpen(!isRailOpen)}
          onOpenSearch={() => {}}
          isPanelOpen={isPanelOpen}
          onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
          onShare={() => {}}
        />
      }
      panel={isPanelOpen ? <SamplePanel onClose={() => setIsPanelOpen(false)} /> : undefined}
      isRailOpen={isRailOpen}
      onCloseRail={() => setIsRailOpen(false)}
      onClosePanel={() => setIsPanelOpen(false)}
    >
      <p className="m-0 p-4 font-ui text-ui">{wording.sampleMarker}: the page goes here.</p>
    </AppShell>
  )
}

const meta = {
  title: 'Templates/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj

export const Wide: Story = { render: () => <ShellExample /> }

export const WideWithThePanelOpen: Story = { render: () => <ShellExample startsWithPanelOpen /> }

export const PhoneWithTheMenuClosed: Story = {
  render: () => <ShellExample />,
  parameters: { viewport: { defaultViewport: 'phone' } },
}

export const PhoneWithTheMenuOpen: Story = {
  render: () => <ShellExample startsWithRailOpen />,
  parameters: { viewport: { defaultViewport: 'phone' } },
}
