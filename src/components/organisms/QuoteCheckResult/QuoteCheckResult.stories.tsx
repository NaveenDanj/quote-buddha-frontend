import type { Meta, StoryObj } from '@storybook/react-vite'
import { QuoteOutcome } from '@domain'
import { sampleQuoteChecks } from '@api/verifyQuote/sampleQuoteChecks'
import { QuoteCheckResult } from './QuoteCheckResult'

const meta = {
  title: 'Components/Organisms/QuoteCheckResult',
  component: QuoteCheckResult,
  tags: ['autodocs'],
  args: {
    results: sampleQuoteChecks,
    selectedOutcome: QuoteOutcome.foundVerbatim,
    onSelectOutcome: () => {},
    onOpenPassage: () => {},
  },
} satisfies Meta<typeof QuoteCheckResult>

export default meta
type Story = StoryObj<typeof meta>

export const FoundVerbatim: Story = {}

export const CloseParaphrase: Story = { args: { selectedOutcome: QuoteOutcome.closeParaphrase } }

export const NotFound: Story = { args: { selectedOutcome: QuoteOutcome.notFound } }
