import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SectionStepper } from './SectionStepper'

const meta = {
  title: 'Components/Molecules/SectionStepper',
  component: SectionStepper,
  tags: ['autodocs'],
  args: {
    title: 'Sample section title',
    sectionNumber: 2,
    sectionCount: 12,
    onPrevious: () => {},
    onNext: () => {},
  },
} satisfies Meta<typeof SectionStepper>

export default meta
type Story = StoryObj<typeof meta>

export const InTheMiddle: Story = {}

export const FirstSection: Story = { args: { sectionNumber: 1 } }

export const LastSection: Story = { args: { sectionNumber: 12 } }

export const LongTitleIsCut: Story = {
  args: { title: 'A very long sample section title that does not fit in the space it is given' },
  decorators: [
    (Story) => (
      <div className="max-w-(--layout-rail)">
        <Story />
      </div>
    ),
  ],
}

function SteppingExample() {
  const [sectionNumber, setSectionNumber] = useState(1)
  return (
    <SectionStepper
      title="Sample section title"
      sectionNumber={sectionNumber}
      sectionCount={5}
      onPrevious={() => setSectionNumber(sectionNumber - 1)}
      onNext={() => setSectionNumber(sectionNumber + 1)}
    />
  )
}

export const Interactive: Story = { render: () => <SteppingExample /> }
