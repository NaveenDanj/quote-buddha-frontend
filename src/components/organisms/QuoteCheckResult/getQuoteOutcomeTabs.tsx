import type { TabItem } from '@ds/atoms/Tabs'
import type { QuoteCheckResult, QuoteOutcome } from '@domain'
import { wording } from '@wording'
import { QuoteOutcomePanel } from './QuoteOutcomePanel'

const tabLabel: Record<QuoteOutcome, string> = {
  foundVerbatim: wording.quoteTabFoundLabel,
  closeParaphrase: wording.quoteTabCloseLabel,
  notFound: wording.quoteTabNoneLabel,
}

export function getQuoteOutcomeTabs(
  results: QuoteCheckResult[],
  onOpenPassage: (citationId: string) => void,
): TabItem[] {
  return results.map((result) => ({
    value: result.outcome,
    label: tabLabel[result.outcome],
    panel: <QuoteOutcomePanel result={result} onOpenPassage={onOpenPassage} />,
  }))
}
