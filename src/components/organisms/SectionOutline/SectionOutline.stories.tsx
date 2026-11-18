import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleDn1Sections } from '@api/reader/readerFixtures'
import { SectionOutline } from './SectionOutline'

const meta = {
  title: 'Components/Organisms/SectionOutline',
  component: SectionOutline,
  tags: ['autodocs'],
  args: {
    workRef: 'DN 1',
    sections: sampleDn1Sections,
    currentIndex: 0,
    onSelectSection: () => {},
  },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-reader-outline)">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionOutline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MiddleSectionCurrent: Story = { args: { currentIndex: 3 } }
