import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from '@ds/atoms/Link'
import { HoverCard } from './HoverCard'

const meta = {
  title: 'Design System/Atoms/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  args: {
    trigger: <Link href="#term">sample term</Link>,
    children: <p>Sample preview text. The full entry is one click away on the link.</p>,
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
