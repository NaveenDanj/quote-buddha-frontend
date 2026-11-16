import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stamp } from './Stamp'

const meta = {
  title: 'Design System/Atoms/Stamp',
  component: Stamp,
  tags: ['autodocs'],
  args: { children: 'corpus v1' },
} satisfies Meta<typeof Stamp>

export default meta
type Story = StoryObj<typeof meta>

export const Caption: Story = {}

export const KeyHint: Story = { args: { isKey: true, children: 'Ctrl K' } }
