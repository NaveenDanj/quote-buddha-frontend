import { EvidenceState } from '@domain'

const fromBackend = {
  abstentionText: 'The early texts included in this database do not establish this.',
  abstentionScope:
    'No supporting passage was found in the included corpus by these methods. ' +
    'This does not show that the Buddha did not teach it.',
  questionHeading: 'Question',
  simpleAnswerHeading: 'Simple answer',
  simpleAnswerLabel:
    "The system's own explanation of the passages below. It is not a quotation, and it has " +
    'not been checked against the texts. Only the quoted words are checked.',
  passagesHeading: 'Passages from the included early texts',
  sourceHeading: 'Source',
  sinhalaLabel: 'Sinhala',
  samePassageNote: '(same passage)',
  paliLabel: 'Pali',
  foundHeading: 'Quoted words found in the included early texts',
  foundYes:
    "yes (the quoted words were found in the included corpus; the explanation is the system's own)",
  foundNo:
    'no (not found in the included corpus by these methods; this does not show that the ' +
    'Buddha did not teach it)',
}

const fromFrontend = {
  foundTag: 'Found in the included texts',
  notEstablishedTag: 'Not established',
  scopeNote:
    'Found in the included texts only. A missing answer does not mean the Buddha did not teach it.',
  partialCorpusNote: 'The database currently includes only part of the early texts.',
  directQuote: 'Direct quote',
  notVerified: 'Not verified',
  notUsed: 'Not used',
  removed: 'Removed',
  notYetIncluded: 'not yet included',
  notYetIncludedTag: 'Not yet included',
  sourceLabel: 'Source',
  helpfulLabel: 'Helpful',
  notHelpfulLabel: 'Not helpful',
  previousVersionLabel: 'Previous version',
  nextVersionLabel: 'Next version',
  previousSectionLabel: 'Previous section',
  nextSectionLabel: 'Next section',
  stepsLabel: 'Steps so far',
  feedbackLabel: 'Rate this answer',
  versionsLabel: 'Question versions',
  sectionsLabel: 'Section',
  copyAnswerLabel: 'Copy answer',
  askAgainLabel: 'Ask again',
  saveToNotebookLabel: 'Save to notebook',
  shareLabel: 'Share',
  addNoteLabel: 'Add a note',
  clarifyLabel: 'Clarify the meaning',
  askAboutThisLabel: 'Ask about this',
  copyCitationLabel: 'Copy citation',
  removeContextLabel: 'Remove context',
  evidenceKeyLabel: 'Evidence key',
  answerActionsLabel: 'Answer actions',
  selectedTextLabel: 'Selected text',
  exampleQuestionsLabel: 'Example questions',
  useSuggestionLabel: 'Use suggestion',
  discardSuggestionLabel: 'Discard',
  translatorMissing: 'Translator: not recorded in source',
  parallelsNotChecked: 'Parallel text: not checked yet',
  systemLabel: 'Written by the system, not a quotation. Check it against the passage.',
  suggestionLabel: 'Suggested by the system',
  aiEnhancedTag: 'AI-enhanced',
  originalNote: 'Your original',
  answersCanBeWrong: 'Answers can be wrong. Check the sources.',
  verifyDisclaimer:
    'Results cover the included texts only (DN 1). Not found does not mean the Buddha did not say it.',
  verifyFound: 'Found verbatim in the included texts',
  verifyClose: 'Close paraphrase found',
  verifyCloseNote:
    'The wording differs from the passage. This is not the exact wording preserved in the included texts.',
  verifyNone: 'Not found in the included texts',
  verifyNoneText: 'We could not find this quote or a close paraphrase in the included texts.',
  trustTitle: 'Why should I trust this?',
  sampleMarker: 'Layout sample',
}

export const wording = { ...fromBackend, ...fromFrontend }

export type Wording = typeof wording

export function versionPositionText(currentVersion: number, versionCount: number): string {
  return `Version ${currentVersion} of ${versionCount}`
}

export function sectionPositionText(sectionNumber: number, sectionCount: number): string {
  return `Section ${sectionNumber} of ${sectionCount}`
}

export function attributedToBuddhaIn(workRef: string): string {
  return `attributed to the Buddha in ${workRef}`
}

// The words shown next to the shape for each evidence state.
export const evidenceStateText: Record<EvidenceState, string> = {
  [EvidenceState.directQuote]: fromFrontend.directQuote,
  [EvidenceState.notVerified]: fromFrontend.notVerified,
  [EvidenceState.notUsed]: fromFrontend.notUsed,
  [EvidenceState.removed]: fromFrontend.removed,
  [EvidenceState.notEstablished]: fromFrontend.notEstablishedTag,
  [EvidenceState.notYetIncluded]: fromFrontend.notYetIncludedTag,
}

// Used by the test that compares the backend group with the backend file.
export const backendWordingKeys = Object.keys(fromBackend) as (keyof typeof fromBackend)[]
