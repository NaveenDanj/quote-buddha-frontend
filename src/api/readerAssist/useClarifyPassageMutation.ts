import { useState } from 'react'
import type { Clarification, ClarifyRequest } from '@domain'

const pretendClarifyDurationInMilliseconds = 700

type ClarifyTriggerResult = {
  unwrap: () => Promise<Clarification>
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// The backend has no POST /clarify yet. This is a layout sample with the same parts the real one will have.
function buildSampleClarification(request: ClarifyRequest): Clarification {
  return {
    plainMeaning: `Layout sample: a plain-language explanation of ${request.paragraphId}, a few sentences long.`,
    keyTerms: [
      { pali: 'diṭṭhi', gloss: 'view' },
      { pali: 'attā', gloss: 'self' },
    ],
    inContext: `This passage sits in section ${request.sectionNumber}, ${request.sectionTitle}. Layout sample: how it connects to the sections around it.`,
    doesNotSay:
      'Layout sample: a caution about reading more into the passage than the text supports. This explanation uses DN 1 only.',
    basedOnCitationId: request.citationId,
    basedOnLabel: `DN 1 · ${request.paragraphId}`,
  }
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
export function useClarifyPassageMutation(): [
  (request: ClarifyRequest) => ClarifyTriggerResult,
  { isLoading: boolean },
] {
  const [isLoading, setIsLoading] = useState(false)

  async function runClarify(request: ClarifyRequest): Promise<Clarification> {
    setIsLoading(true)
    await wait(pretendClarifyDurationInMilliseconds)
    setIsLoading(false)
    return buildSampleClarification(request)
  }

  function clarifyPassage(request: ClarifyRequest): ClarifyTriggerResult {
    const pendingClarification = runClarify(request)
    return { unwrap: () => pendingClarification }
  }

  return [clarifyPassage, { isLoading }]
}
