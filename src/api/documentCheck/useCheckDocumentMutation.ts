import { useState } from 'react'
import type { DocumentCheckRequest, DocumentCheckResult } from '@domain'
import { sampleDocumentCheckResult } from './sampleDocumentCheck'

const pretendCheckDurationInMilliseconds = 600

type CheckDocumentTriggerResult = {
  unwrap: () => Promise<DocumentCheckResult>
}

type CheckDocumentState = {
  data: DocumentCheckResult | undefined
  isLoading: boolean
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
// The real endpoint is an async job, so the check takes a moment and the page shows that.
export function useCheckDocumentMutation(): [
  (request: DocumentCheckRequest) => CheckDocumentTriggerResult,
  CheckDocumentState,
] {
  const [data, setData] = useState<DocumentCheckResult>()
  const [isLoading, setIsLoading] = useState(false)

  async function runCheck(): Promise<DocumentCheckResult> {
    setIsLoading(true)
    await wait(pretendCheckDurationInMilliseconds)
    setData(sampleDocumentCheckResult)
    setIsLoading(false)
    return sampleDocumentCheckResult
  }

  function checkDocument(request: DocumentCheckRequest): CheckDocumentTriggerResult {
    void request
    const pendingResult = runCheck()
    return { unwrap: () => pendingResult }
  }

  return [checkDocument, { data, isLoading }]
}
