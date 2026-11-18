import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'Design System/Atoms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: { title: 'Nothing here yet' },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {}

export const WithIconAndDescription: Story = {
  args: { icon: 'ask', description: 'Things you add will show up here.' },
}
