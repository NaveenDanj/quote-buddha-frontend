import type { Answer, StreamStep } from '@domain'
import { AbstentionReason, AnswerDepth, AnswerStatus, EvidenceLabel, StreamStepKind } from '@domain'
import { wording } from '@wording'
import { buildAnswer, buildClaim, buildSource } from './builders'

const quotedSource = buildSource({
  citationId: 'sample:dn-1:1',
  location: {
    collection: 'Sample collection',
    nikaya: 'Sample nikaya',
    work: 'Sample work',
    section: '44.5',
  },
})
const leaningSource = buildSource({
  citationId: 'sample:dn-1:2',
  translator: null,
  location: {
    collection: 'Sample collection',
    nikaya: 'Sample nikaya',
    work: 'Sample work',
    section: '12.3',
  },
})
const unusedSource = buildSource({
  citationId: 'sample:dn-1:3',
  used: false,
  location: {
    collection: 'Sample collection',
    nikaya: 'Sample nikaya',
    work: 'Sample work',
    section: '7.1',
  },
})

const quotedClaim = buildClaim({
  text: `${wording.sampleMarker}: a claim whose quoted words were found`,
  citationIds: [quotedSource.citationId],
  quoteCitationId: quotedSource.citationId,
  evidenceLabel: EvidenceLabel.direct,
})

const leaningClaim = buildClaim({
  text: `${wording.sampleMarker}: a claim whose quote could not be checked`,
  citationIds: [leaningSource.citationId],
  quoteCitationId: leaningSource.citationId,
  evidenceLabel: EvidenceLabel.unverified,
})

export const answeredQuickAnswer: Answer = buildAnswer({
  claims: [quotedClaim, leaningClaim],
  sources: [quotedSource, leaningSource, unusedSource],
  terms: [{ pali: 'diṭṭhi', gloss: 'view', occurrences: 4 }],
  droppedClaimCount: 1,
  retrievedCount: 3,
})

export const answeredDeepAnswer: Answer = buildAnswer({
  ...answeredQuickAnswer,
  depth: AnswerDepth.deep,
  report: {
    outline: [`${wording.sampleMarker}: outline`],
    sections: [
      { heading: `${wording.sampleMarker}: section`, claims: [quotedClaim, leaningClaim] },
    ],
  },
})

export const abstainedWeakEvidenceAnswer: Answer = buildAnswer({
  status: AnswerStatus.abstained,
  simpleAnswer: null,
  abstentionReason: AbstentionReason.weakEvidence,
  foundInIncludedTexts: false,
  sources: [unusedSource],
  retrievedCount: 1,
})

export const abstainedNotEnoughClaimsAnswer: Answer = buildAnswer({
  status: AnswerStatus.abstained,
  simpleAnswer: null,
  abstentionReason: AbstentionReason.notEnoughVerifiedClaims,
  foundInIncludedTexts: false,
  droppedClaimCount: 2,
  sources: [unusedSource],
  retrievedCount: 1,
})

export const sourceWithoutTranslator = leaningSource

export const sampleStreamSteps: StreamStep[] = [
  { kind: StreamStepKind.searching, text: `${wording.sampleMarker}: searching the included texts` },
  { kind: StreamStepKind.retrieved, text: `${wording.sampleMarker}: passages found`, count: 3 },
  { kind: StreamStepKind.drafting, text: `${wording.sampleMarker}: drafting the explanation` },
  { kind: StreamStepKind.verifying, text: `${wording.sampleMarker}: checking every quote` },
]
