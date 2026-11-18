import type { ComparablePassage } from '@domain'
import { sampleComparablePassages } from './comparableFixtures'

type GetComparablePassageResult = {
  data: ComparablePassage | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook. Pass no id to skip the request, as RTK Query's skip does.
export function useGetComparablePassageQuery(
  citationId: string | undefined,
): GetComparablePassageResult {
  const passage = sampleComparablePassages.find((candidate) => candidate.citationId === citationId)
  return { data: passage, isLoading: false, isError: false }
}
