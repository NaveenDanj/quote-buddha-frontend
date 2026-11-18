import { useState } from 'react'
import { QuoteOutcome } from '@domain'
import { sampleQuoteChecks } from '@api/verifyQuote/sampleQuoteChecks'
import { useVerifyQuoteMutation } from '@api/verifyQuote'
import { wording } from '@wording'

export function useQuoteCheck() {
  const [quote, setQuote] = useState(wording.verifySampleQuote)
  const [selectedOutcome, setSelectedOutcome] = useState<QuoteOutcome>(QuoteOutcome.foundVerbatim)
  const [verifyQuote, { isLoading: isChecking }] = useVerifyQuoteMutation()

  const canCheck = quote.trim().length > 0

  async function check() {
    const result = await verifyQuote({ quote }).unwrap()
    setSelectedOutcome(result.outcome)
  }

  return {
    quote,
    setQuote,
    canCheck,
    isChecking,
    results: sampleQuoteChecks,
    selectedOutcome,
    setSelectedOutcome,
    check,
  }
}
