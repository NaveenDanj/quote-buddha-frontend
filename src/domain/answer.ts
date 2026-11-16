// These types mirror the backend answer model. Source of truth: docs/references/api-contract.md.
// Fields marked NEEDS BACKEND do not exist in the backend yet. The mock data supplies them for now.

export const AnswerStatus = {
  answered: 'ANSWERED',
  abstained: 'ABSTAINED',
} as const
export type AnswerStatus = (typeof AnswerStatus)[keyof typeof AnswerStatus]

// DIRECT: the quoted words were found verbatim in the cited passage.
// UNVERIFIED: the claim is shown, but its quote could not be checked.
export const EvidenceLabel = {
  direct: 'DIRECT',
  unverified: 'UNVERIFIED',
} as const
export type EvidenceLabel = (typeof EvidenceLabel)[keyof typeof EvidenceLabel]

export const AbstentionReason = {
  weakEvidence: 'WEAK_EVIDENCE',
  notEnoughVerifiedClaims: 'NOT_ENOUGH_VERIFIED_CLAIMS',
} as const
export type AbstentionReason = (typeof AbstentionReason)[keyof typeof AbstentionReason]

export const AnswerDepth = {
  quick: 'quick',
  deep: 'deep',
} as const
export type AnswerDepth = (typeof AnswerDepth)[keyof typeof AnswerDepth]

// NEEDS BACKEND
export const MatchedBy = {
  words: 'WORDS',
  similarText: 'SIMILAR_TEXT',
} as const
export type MatchedBy = (typeof MatchedBy)[keyof typeof MatchedBy]

// NEEDS BACKEND
export type SourceLocation = {
  collection: string
  nikaya: string
  work: string
  section?: string
}

export type AnswerSource = {
  // For example 'pitaka_lk:dn-1:44:5'.
  citationId: string
  // For example 'DN 1'.
  workRef: string
  workTitle: string
  sinhalaText: string
  paliText: string
  // NEEDS BACKEND from here down.
  matchedBy: MatchedBy
  // From 0 to 1.
  similarity: number
  // False when the passage was retrieved but no claim used it.
  used: boolean
  edition: string
  // Null means the source does not say. The screen then says it is not recorded.
  translator: string | null
  checksum: string
  location: SourceLocation
}

export type VerifiedClaim = {
  text: string
  citationIds: string[]
  quote: string
  quoteCitationId: string
  quoteEditionLanguage: string
  evidenceLabel: EvidenceLabel
}

// NEEDS BACKEND
export type AnswerTerm = {
  pali: string
  gloss: string
  occurrences: number
}

// NEEDS BACKEND
export type DeepReportSection = {
  heading: string
  claims: VerifiedClaim[]
}

// NEEDS BACKEND
export type DeepReport = {
  outline: string[]
  sections: DeepReportSection[]
}

export type Answer = {
  question: string
  status: AnswerStatus
  // The system's own explanation. Null when the answer is abstained.
  simpleAnswer: string | null
  claims: VerifiedClaim[]
  sources: AnswerSource[]
  abstentionReason: AbstentionReason | null
  // True when the answer was found in the included texts.
  foundInIncludedTexts: boolean
  // NEEDS BACKEND from here down.
  corpusVersion: string
  // An ISO date.
  generatedAt: string
  depth: AnswerDepth
  terms: AnswerTerm[]
  // How many claims were removed because they failed verification.
  droppedClaimCount: number
  retrievedCount: number
  // Only present when depth is 'deep'.
  report?: DeepReport
}
