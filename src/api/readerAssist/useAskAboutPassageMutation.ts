import type { AskRequest, PassageAnswer } from '@domain'

const pretendAskDurationInMilliseconds = 900

type AskTriggerResult = {
  unwrap: () => Promise<PassageAnswer>
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

// The backend has no passage-level /ask yet. This is a layout sample that points at the passage.
async function answerAboutPassage(request: AskRequest): Promise<PassageAnswer> {
  await wait(pretendAskDurationInMilliseconds)
  return {
    text: `Layout sample: an answer about passage ${request.paragraphId}. It refers to the passage and to the sections around it.`,
    citationId: request.citationId,
    citationLabel: `DN 1 · ${request.paragraphId}`,
  }
}

function askAboutPassage(request: AskRequest): AskTriggerResult {
  const pendingAnswer = answerAboutPassage(request)
  return { unwrap: () => pendingAnswer }
}

// Same name and result shape as an RTK Query mutation hook: a trigger and its state.
// Each question is shown as soon as it is asked, so the page tracks which ones still wait for an answer.
export function useAskAboutPassageMutation(): [typeof askAboutPassage, { isLoading: boolean }] {
  return [askAboutPassage, { isLoading: false }]
}
