import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleTerms } from '@api/terms/termFixtures'
import { TermDetails } from './TermDetails'

const [firstTerm, , , lastTerm] = sampleTerms

const meta = {
  title: 'Components/Organisms/TermDetails',
  component: TermDetails,
  tags: ['autodocs'],
  args: {
    term: firstTerm ?? {
      id: 'none',
      pali: '',
      gloss: '',
      glossesText: '',
      variants: [],
      note: '',
      occurrences: [],
    },
    onOpenPassage: () => {},
    onOpenReader: () => {},
    onAskAboutTerm: () => {},
  },
  decorators: [
    (Story) => (
      <div className="grid gap-page">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TermDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutAPassage: Story = { args: { term: lastTerm ?? firstTerm } }
