import type { ReaderSection } from '@domain'
import { sampleDn1Sections } from './readerFixtures'

type GetSuttaSectionsResult = {
  data: ReaderSection[] | undefined
  isLoading: boolean
  isError: boolean
}

const includedSuttaId = 'dn-1'

// Same name and result shape as an RTK Query hook. The backend has no GET /texts/{work}/sections yet.
export function useGetSuttaSectionsQuery(suttaId: string): GetSuttaSectionsResult {
  const sections = suttaId === includedSuttaId ? sampleDn1Sections : []
  return { data: sections, isLoading: false, isError: false }
}
