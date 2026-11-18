import type { TermEntry } from '@domain'
import { sampleTerms } from './termFixtures'

type GetTermResult = {
  data: TermEntry | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook. Pass no id to skip the request, as RTK Query's skip does.
export function useGetTermQuery(termId: string | undefined): GetTermResult {
  const term = sampleTerms.find((candidate) => candidate.id === termId)
  return { data: term, isLoading: false, isError: false }
}
