import type { Meta, StoryObj } from '@storybook/react-vite'
import { sampleDocumentCheckResult } from '@api/documentCheck/sampleDocumentCheck'
import { DocumentCheckResult } from './DocumentCheckResult'

const meta = {
  title: 'Components/Organisms/DocumentCheckResult',
  component: DocumentCheckResult,
  tags: ['autodocs'],
  args: {
    sayings: sampleDocumentCheckResult.sayings,
    onOpenPassage: () => {},
    onExportReport: () => {},
  },
} satisfies Meta<typeof DocumentCheckResult>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const NothingFound: Story = {
  args: {
    sayings: sampleDocumentCheckResult.sayings.filter((saying) => saying.outcome === 'notFound'),
  },
}
