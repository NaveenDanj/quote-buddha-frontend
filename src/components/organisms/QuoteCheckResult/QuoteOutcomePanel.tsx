import { QuoteOutcome, type QuoteCheckResult } from '@domain'
import { CloseParaphrase } from './CloseParaphrase'
import { FoundVerbatim } from './FoundVerbatim'
import { NotFound } from './NotFound'

type QuoteOutcomePanelProps = {
  result: QuoteCheckResult
  onOpenPassage: (citationId: string) => void
}

export function QuoteOutcomePanel({ result, onOpenPassage }: QuoteOutcomePanelProps) {
  switch (result.outcome) {
    case QuoteOutcome.foundVerbatim:
      return <FoundVerbatim passage={result.passage} onOpenPassage={onOpenPassage} />
    case QuoteOutcome.closeParaphrase:
      return (
        <CloseParaphrase
          passage={result.passage}
          yourQuoteParts={result.yourQuoteParts}
          passageParts={result.passageParts}
          onOpenPassage={onOpenPassage}
        />
      )
    case QuoteOutcome.notFound:
      return <NotFound />
  }
}
