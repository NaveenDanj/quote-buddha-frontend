import type { Answer, AnswerSource, VerifiedClaim } from '@domain'
import { AnswerDepth, AnswerStatus, EvidenceLabel, MatchedBy } from '@domain'
import { wording } from '@wording'

// Every text here is a marked sample. Never put a real quotation next to a made-up citation.
export function buildSource(overrides: Partial<AnswerSource> = {}): AnswerSource {
  return {
    citationId: 'sample:dn-1:1',
    workRef: 'Sample work',
    workTitle: 'Sample work title',
    sinhalaText: `${wording.sampleMarker}: sample Sinhala text`,
    paliText: `${wording.sampleMarker}: sample Pali text`,
    matchedBy: MatchedBy.words,
    similarity: 0.82,
    used: true,
    edition: 'Sample edition',
    translator: 'Sample translator',
    checksum: 'sample-checksum',
    location: { collection: 'Sample collection', nikaya: 'Sample nikaya', work: 'Sample work' },
    ...overrides,
  }
}

export function buildClaim(overrides: Partial<VerifiedClaim> = {}): VerifiedClaim {
  return {
    text: `${wording.sampleMarker}: sample claim`,
    citationIds: ['sample:dn-1:1'],
    quote: `${wording.sampleMarker}: sample quoted words`,
    quoteCitationId: 'sample:dn-1:1',
    quoteEditionLanguage: 'si',
    evidenceLabel: EvidenceLabel.direct,
    ...overrides,
  }
}

export function buildAnswer(overrides: Partial<Answer> = {}): Answer {
  return {
    question: `${wording.sampleMarker}: sample question?`,
    status: AnswerStatus.answered,
    simpleAnswer: `${wording.sampleMarker}: plain-language summary written by the system.`,
    claims: [],
    sources: [],
    abstentionReason: null,
    foundInIncludedTexts: true,
    corpusVersion: 'sample-v0',
    generatedAt: '2026-01-01T00:00:00Z',
    depth: AnswerDepth.quick,
    terms: [],
    droppedClaimCount: 0,
    retrievedCount: 0,
    ...overrides,
  }
}
