import type { Meta, StoryObj } from '@storybook/react-vite'
import { wording } from '@wording'
import { TopBar } from './TopBar'

const meta = {
  title: 'Components/Organisms/TopBar',
  component: TopBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    title: `${wording.sampleMarker}: a chat title`,
    railId: 'rail-sample',
    isRailOpen: false,
    onToggleRail: () => {},
    onOpenSearch: () => {},
    isPanelOpen: false,
    onTogglePanel: () => {},
    onShare: () => {},
  },
} satisfies Meta<typeof TopBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ResearchPanelOpen: Story = { args: { isPanelOpen: true } }

export const MenuOpenOnAPhone: Story = {
  args: { isRailOpen: true },
  parameters: { viewport: { defaultViewport: 'phone' } },
}

export const LongTitleIsCut: Story = {
  args: { title: `${wording.sampleMarker}: ${'a very long chat title '.repeat(10)}` },
  parameters: { viewport: { defaultViewport: 'phone' } },
}
