import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs } from './Tabs'

const researchTabs = [
  {
    value: 'sources',
    label: 'Sources',
    panel: <p className="font-ui text-ui">Sample sources list.</p>,
  },
  {
    value: 'evidence',
    label: 'Evidence',
    panel: <p className="font-ui text-ui">Sample evidence matrix.</p>,
  },
  { value: 'terms', label: 'Terms', panel: <p className="font-ui text-ui">Sample terms list.</p> },
  { value: 'notes', label: 'Notes', panel: <p className="font-ui text-ui">Sample notes.</p> },
]

const meta = {
  title: 'Design System/Atoms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: { label: 'Research panel', tabs: researchTabs },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const StartingOnAnotherTab: Story = { args: { defaultValue: 'terms' } }

export const WithIcons: Story = {
  args: {
    tabs: [
      { value: 'sources', label: 'Sources', icon: 'reader', panel: <p>Sample sources.</p> },
      { value: 'notes', label: 'Notes', icon: 'notes', panel: <p>Sample notes.</p> },
    ],
  },
}
