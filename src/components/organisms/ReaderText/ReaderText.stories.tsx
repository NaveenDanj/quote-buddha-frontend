import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReadingView } from '@domain'
import { sampleDn1Sections } from '@api/reader/readerFixtures'
import { ReaderText } from './ReaderText'

const [firstSection, secondSection] = sampleDn1Sections

const meta = {
  title: 'Components/Organisms/ReaderText',
  component: ReaderText,
  tags: ['autodocs'],
  args: {
    workRef: 'DN 1',
    section: firstSection ?? { id: 'none', paliTitle: '', englishTitle: '', paragraphs: [] },
    sectionNumber: 1,
    sectionCount: sampleDn1Sections.length,
    previousSection: undefined,
    nextSection: secondSection,
    onStepSection: () => {},
    view: ReadingView.both,
    selectedParagraphId: '1.1',
    onSelectParagraph: () => {},
    noteCountByParagraphId: { '1.1': 2 },
    onParagraphAction: () => {},
    getParagraphLink: (citationId: string) => `https://example.test/reader#${citationId}`,
  },
} satisfies Meta<typeof ReaderText>

export default meta
type Story = StoryObj<typeof meta>

export const Both: Story = {}

export const PaliOnly: Story = { args: { view: ReadingView.pali } }

export const EnglishOnly: Story = { args: { view: ReadingView.translation } }

export const NoParagraphSelected: Story = { args: { selectedParagraphId: undefined } }

export const MiddleSection: Story = {
  args: {
    section: secondSection ?? { id: 'none', paliTitle: '', englishTitle: '', paragraphs: [] },
    sectionNumber: 2,
    previousSection: firstSection,
    nextSection: sampleDn1Sections[2],
  },
}
