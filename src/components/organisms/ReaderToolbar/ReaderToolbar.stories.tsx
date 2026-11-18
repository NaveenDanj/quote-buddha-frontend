import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReadingView } from '@domain'
import { sampleDn1Sections, sampleSuttas } from '@api/reader/readerFixtures'
import { ReaderToolbar } from './ReaderToolbar'

const [firstSutta] = sampleSuttas

const meta = {
  title: 'Components/Organisms/ReaderToolbar',
  component: ReaderToolbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    suttas: sampleSuttas,
    currentSutta: firstSutta ?? { id: 'none', workRef: '', title: '', isIncluded: true },
    onChooseSutta: () => {},
    sections: sampleDn1Sections,
    currentSectionIndex: 0,
    onChangeSection: () => {},
    view: ReadingView.both,
    onChangeView: () => {},
    onChangeTextSize: () => {},
    isOutlineOpen: true,
    onToggleOutline: () => {},
    isSideOpen: true,
    onToggleSide: () => {},
    noteCount: 2,
  },
} satisfies Meta<typeof ReaderToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LastSection: Story = { args: { currentSectionIndex: sampleDn1Sections.length - 1 } }

export const PaliOnly: Story = { args: { view: ReadingView.pali } }

export const NoNotes: Story = { args: { noteCount: 0, isSideOpen: false } }

export const OutlineClosed: Story = { args: { isOutlineOpen: false } }
