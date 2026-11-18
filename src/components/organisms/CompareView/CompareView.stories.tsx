import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleComparablePassages } from '@api/compare/comparableFixtures'
import { CompareView } from './CompareView'

const [first, second] = sampleComparablePassages

const meta = {
  title: 'Components/Organisms/CompareView',
  component: CompareView,
  tags: ['autodocs'],
  args: {
    options: sampleComparablePassages.map(({ citationId, label }) => ({ citationId, label })),
    firstCitationId: first?.citationId,
    secondCitationId: second?.citationId,
    onChooseFirst: () => {},
    onChooseSecond: () => {},
    firstPassage: first,
    secondPassage: second,
  },
  decorators: [
    (Story) => (
      <div className="grid gap-page">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CompareView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SamePassageTwice: Story = {
  args: { secondCitationId: first?.citationId, secondPassage: first },
}
