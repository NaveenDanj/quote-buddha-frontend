import type { TermSummary } from '@domain'
import { sampleTerms } from './termFixtures'

type GetTermsResult = {
  data: TermSummary[] | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook, so swapping it in later changes only this file.
export function useGetTermsQuery(): GetTermsResult {
  const summaries = sampleTerms.map((term) => ({ id: term.id, pali: term.pali }))
  return { data: summaries, isLoading: false, isError: false }
}
