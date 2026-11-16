import type { Meta, StoryObj } from '@storybook/react-vite'
import { EvidenceState, TextLanguage } from '@domain'
import { wording } from '@wording'
import { EvidenceTag } from '@components/molecules/EvidenceTag'
import { PassageQuote } from './PassageQuote'

const sampleQuote = `${wording.sampleMarker}: placeholder quotation text, not from a real passage.`

const meta = {
  title: 'Components/Molecules/PassageQuote',
  component: PassageQuote,
  tags: ['autodocs'],
  args: { quote: sampleQuote, language: TextLanguage.english },
  argTypes: {
    language: { control: 'inline-radio', options: Object.values(TextLanguage) },
  },
} satisfies Meta<typeof PassageQuote>

export default meta
type Story = StoryObj<typeof meta>

export const QuoteOnly: Story = {}

export const WithSource: Story = {
  args: {
    source: (
      <>
        <span className="font-code text-code">Sample citation</span>
        <EvidenceTag state={EvidenceState.notVerified} />
      </>
    ),
  },
}

export const LongQuoteWraps: Story = {
  args: { quote: `${sampleQuote} `.repeat(6) },
}

export const Pali: Story = {
  args: {
    quote: `${wording.sampleMarker} in Pali diacritics: ṃ ñ ṇ ṭ ḍ ḷ ṅ ā ī ū`,
    language: TextLanguage.pali,
  },
}
