import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@ds/atoms/Textarea'
import { wording } from '@wording'
import { ChatLayout } from './ChatLayout'

const sampleMessage = (position: number) => (
  <p key={position} className="m-0 font-reading text-reading">
    {wording.sampleMarker}: message {position + 1}. {'A sentence that fills the line. '.repeat(6)}
  </p>
)

const meta = {
  title: 'Templates/ChatLayout',
  component: ChatLayout,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    composer: <Textarea label={wording.composerLabel} placeholder={wording.composerPlaceholder} />,
    children: [0, 1].map(sampleMessage),
  },
} satisfies Meta<typeof ChatLayout>

export default meta
type Story = StoryObj<typeof meta>

export const FewMessages: Story = {}

export const ManyMessagesComposerStaysAtTheBottom: Story = {
  args: { children: Array.from({ length: 12 }, (_, position) => sampleMessage(position)) },
}

export const AtPhoneWidth: Story = { parameters: { viewport: { defaultViewport: 'phone' } } }
