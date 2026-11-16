import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '../Icon'
import { VisuallyHidden } from './VisuallyHidden'

const meta = {
  title: 'Design System/Atoms/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  args: { children: 'Verified quotation' },
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof meta>

// The words are in the page for screen readers. Sighted people see only the icon.
export const NextToAnIcon: Story = {
  render: (args) => (
    <span className="inline-flex items-center gap-2 font-ui text-ui">
      <Icon name="verify" />
      <VisuallyHidden>{args.children}</VisuallyHidden>
    </span>
  ),
}
