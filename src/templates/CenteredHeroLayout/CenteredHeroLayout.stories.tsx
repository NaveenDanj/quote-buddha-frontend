import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@ds/atoms/Text'
import { wording } from '@wording'
import { CenteredHeroLayout } from './CenteredHeroLayout'

const meta = {
  title: 'Templates/CenteredHeroLayout',
  component: CenteredHeroLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    children: (
      <Text variant="display" as="h1" className="text-center">
        {wording.newChatHeading}
      </Text>
    ),
  },
} satisfies Meta<typeof CenteredHeroLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAFooterNote: Story = {
  args: {
    footer: (
      <Text variant="caption" as="p" className="text-text-muted">
        {wording.answersCanBeWrong}
      </Text>
    ),
  },
}
