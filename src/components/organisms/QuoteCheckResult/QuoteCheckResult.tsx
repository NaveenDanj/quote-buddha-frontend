import { Tabs } from '@ds/atoms/Tabs'
import {
  toQuoteOutcome,
  type QuoteCheckResult as QuoteCheckResultData,
  type QuoteOutcome,
} from '@domain'
import { wording } from '@wording'
import { ScopeDisclaimer } from '@components/molecules/ScopeDisclaimer'
import { getQuoteOutcomeTabs } from './getQuoteOutcomeTabs'

type QuoteCheckResultProps = {
  results: QuoteCheckResultData[]
  selectedOutcome: QuoteOutcome
  onSelectOutcome: (outcome: QuoteOutcome) => void
  onOpenPassage: (citationId: string) => void
}

export function QuoteCheckResult({
  results,
  selectedOutcome,
  onSelectOutcome,
  onOpenPassage,
}: QuoteCheckResultProps) {
  return (
    <section aria-label={wording.verifyResultLabel} className="grid gap-section">
      <Tabs
        label={wording.quoteTabsLabel}
        tabs={getQuoteOutcomeTabs(results, onOpenPassage)}
        value={selectedOutcome}
        onValueChange={(value) => onSelectOutcome(toQuoteOutcome(value))}
        contentClassName="grid gap-section"
      />
      <ScopeDisclaimer />
    </section>
  )
}
