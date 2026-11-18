import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScopeDisclaimer } from './ScopeDisclaimer'

const meta = {
  title: 'Components/Molecules/ScopeDisclaimer',
  component: ScopeDisclaimer,
  tags: ['autodocs'],
} satisfies Meta<typeof ScopeDisclaimer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
