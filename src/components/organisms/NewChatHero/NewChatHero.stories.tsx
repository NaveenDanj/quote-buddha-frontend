import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@ds/atoms/Textarea'
import { wording } from '@wording'
import { CoverageStrip } from '@components/molecules/CoverageStrip'
import { NewChatHero } from './NewChatHero'

const meta = {
  title: 'Components/Organisms/NewChatHero',
  component: NewChatHero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    composer: (
      <Textarea
        label={wording.sampleMarker}
        placeholder={`${wording.sampleMarker}: the composer goes here`}
      />
    ),
    suggestions: [
      `${wording.sampleMarker}: a suggested question?`,
      `${wording.sampleMarker}: another suggested question?`,
    ],
    onChooseSuggestion: () => {},
    tools: [
      { title: wording.toolVerifyTitle, description: wording.toolVerifyText, onOpen: () => {} },
      { title: wording.toolReaderTitle, description: wording.toolReaderText, onOpen: () => {} },
      { title: wording.toolTermsTitle, description: wording.toolTermsText, onOpen: () => {} },
      { title: wording.toolCompareTitle, description: wording.toolCompareText, onOpen: () => {} },
    ],
    recentChats: [
      { id: '1', title: `${wording.sampleMarker}: a recent chat`, onOpen: () => {} },
      { id: '2', title: `${wording.sampleMarker}: an older chat`, onOpen: () => {} },
    ],
    coverage: (
      <CoverageStrip
        title={`${wording.sampleMarker}: collection`}
        summary={`${wording.sampleMarker}: 1 of 34 texts`}
        includedCount={1}
        totalCount={34}
      />
    ),
  },
} satisfies Meta<typeof NewChatHero>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NoRecentChats: Story = { args: { recentChats: [] } }

export const AtPhoneWidth: Story = {
  parameters: { viewport: { defaultViewport: 'phone' } },
}
