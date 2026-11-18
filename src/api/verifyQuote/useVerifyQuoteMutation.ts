import { useState } from 'react'
import type { QuoteCheckRequest, QuoteCheckResult } from '@domain'
import { notFoundSample, sampleQuoteChecks } from './sampleQuoteChecks'

const pretendCheckDurationInMilliseconds = 400

type VerifyQuoteTriggerResult = {
  unwrap: () => Promise<QuoteCheckResult>
}

type VerifyQuoteState = {
  data: QuoteCheckResult | undefined
  isLoading: boolean
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
// Until the backend answers, each check shows the next of the three sample outcomes.
export function useVerifyQuoteMutation(): [
  (request: QuoteCheckRequest) => VerifyQuoteTriggerResult,
  VerifyQuoteState,
] {
  const [data, setData] = useState<QuoteCheckResult>()
  const [isLoading, setIsLoading] = useState(false)
  const [checkCount, setCheckCount] = useState(0)

  async function runCheck(): Promise<QuoteCheckResult> {
    const sample = sampleQuoteChecks[checkCount % sampleQuoteChecks.length] ?? notFoundSample
    setIsLoading(true)
    await wait(pretendCheckDurationInMilliseconds)
    setCheckCount(checkCount + 1)
    setData(sample)
    setIsLoading(false)
    return sample
  }

  function verifyQuote(request: QuoteCheckRequest): VerifyQuoteTriggerResult {
    void request
    const pendingResult = runCheck()
    return { unwrap: () => pendingResult }
  }

  return [verifyQuote, { data, isLoading }]
}
