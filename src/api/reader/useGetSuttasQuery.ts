import type { Sutta } from '@domain'
import { sampleSuttas } from './readerFixtures'

type GetSuttasResult = {
  data: Sutta[] | undefined
  isLoading: boolean
  isError: boolean
}

// Same name and result shape as an RTK Query hook, so swapping it in later changes only this file.
// The backend has no GET /texts yet, so only DN 1 is open and the rest are listed as not yet included.
export function useGetSuttasQuery(): GetSuttasResult {
  return { data: sampleSuttas, isLoading: false, isError: false }
}
