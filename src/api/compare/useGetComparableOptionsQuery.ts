import type { ComparableOption } from '@domain'
import { sampleComparablePassages } from './comparableFixtures'

type GetComparableOptionsResult = {
  data: ComparableOption[] | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook, so swapping it in later changes only this file.
export function useGetComparableOptionsQuery(): GetComparableOptionsResult {
  const options = sampleComparablePassages.map(({ citationId, label }) => ({ citationId, label }))
  return { data: options, isLoading: false, isError: false }
}
