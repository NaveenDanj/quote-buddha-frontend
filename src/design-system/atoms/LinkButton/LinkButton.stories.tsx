import type { Meta, StoryObj } from '@storybook/react-vite'
import { LinkButton } from './LinkButton'

const meta = {
  title: 'Design System/Atoms/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: { children: 'Open the passage', onClick: () => {} },
} satisfies Meta<typeof LinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Code: Story = {
  args: { textVariant: 'code', weight: 'medium', children: 'DN 1 · 44.5' },
}

export const Accent: Story = { args: { isAccent: true, isUnderlined: false, children: '[1]' } }
