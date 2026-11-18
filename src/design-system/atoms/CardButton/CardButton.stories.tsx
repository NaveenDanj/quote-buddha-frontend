import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { CardButton } from './CardButton'

const meta = {
  title: 'Design System/Atoms/CardButton',
  component: CardButton,
  tags: ['autodocs'],
  args: {
    onClick: () => {},
    className: 'gap-1 border-border bg-transparent px-4 py-3 hover:border-text',
    children: (
      <>
        <Text variant="ui" weight="medium" as="span">
          Verify a quote
        </Text>
        <Text variant="caption" isMuted>
          Check a saying against the texts
        </Text>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-tool-card)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
