import { AbstentionReason, EvidenceState, MatchedBy } from '@domain'

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
  askFailedText: 'Something went wrong while answering. Please try again.',
  productName: 'Quote Buddha',
  skipToMainLabel: 'Skip to main content',
  conversationLabel: 'Conversation',
  composerLabel: 'Ask a question',
  composerPlaceholder: 'Ask about the early texts. Type / for tools.',
  askLabel: 'Ask',
  stopLabel: 'Stop',
  attachLabel: 'Attach a file',
  depthLabel: 'Answer depth',
  depthQuickLabel: 'Quick',
  depthDeepLabel: 'Deep research',
  earlyTextsLabel: 'Early texts',
  commentariesLabel: 'Commentaries',
  slashMenuLabel: 'Commands',
  workspaceLabel: 'Chats and tools',
  chatsLabel: 'Chats',
  noChatsTitle: 'No chats yet',
  noChatsText: 'Your questions will be kept here.',
  searchShortcutText: 'Ctrl K',
  answerWritingText: 'The answer is being written.',
  composerHintText: 'Enter sends. Shift and Enter adds a line. Type / for commands.',
  newChatLabel: 'New chat',
  searchChatsLabel: 'Search chats and texts',
  searchDialogTitle: 'Search',
  searchPlaceholder: 'Search chats and actions',
  searchResultsLabel: 'Results',
  searchHintText: 'Up and Down to move, Enter to open, Esc to close',
  noResultsText: 'Nothing matches.',
  searchActionKind: 'Action',
  searchChatKind: 'Chat',
  closeSettingsLabel: 'Close settings',
  readingSizeLabel: 'Reading text size',
  sizeSmallLabel: 'Small',
  sizeMediumLabel: 'Medium',
  sizeLargeLabel: 'Large',
  themeLabel: 'Theme',
  themeSystemLabel: 'System',
  themeLightLabel: 'Light',
  themeDarkLabel: 'Dark',
  languageLabel: 'Language',
  englishLabel: 'English',
  sinhalaNativeLabel: 'සිංහල',
  soonText: 'soon',
  settingsNote: 'Settings are saved in this browser.',
  toolsGroupLabel: 'Research tools',
  settingsLabel: 'Settings',
  chatOptionsLabel: 'Chat options',
  menuLabel: 'Menu',
  searchLabel: 'Search (Ctrl K)',
  shareChatLabel: 'Share this chat',
  navReaderLabel: 'Reader',
  navTermsLabel: 'Terms',
  navCompareLabel: 'Compare',
  navNotebookLabel: 'Notebook',
  navVerifyLabel: 'Verify a quote',
  navCheckLabel: 'Check a document',
  todayLabel: 'Today',
  earlierLabel: 'Earlier',
  pinnedLabel: 'Pinned',
  pinChatLabel: 'Pin chat',
  unpinChatLabel: 'Unpin chat',
  deleteChatLabel: 'Delete chat',
  noNotesText: 'No notes on this answer yet.',
  researchPanelLabel: 'Research panel',
  latestAnswerNote: '· latest answer',
  compareLabel: 'Compare',
  saveLabel: 'Save',
  locationInCanonLabel: 'Location in the canon',
  researchTabsLabel: 'Research tabs',
  graphDetailsLabel: 'Details',
  closePanelLabel: 'Close research panel',
  evidenceTabLabel: 'Evidence',
  termsTabLabel: 'Terms',
  notesTabLabel: 'Notes',
  noTermsText: 'No terms in this answer.',
  graphClaimLabel: 'Claim',
  graphPassageLabel: 'Passage',
  graphTextLabel: 'Text',
  graphHintText: 'Choose a box in the graph to see its details.',
  graphListLabel: 'Source graph as a list',
  editionLabel: 'Edition',
  translatorLabel: 'Translator',
  checksumLabel: 'Checksum',
  locationLabel: 'Location',
  matchLabel: 'Match',
  notRecordedInSource: 'Not recorded in source',
  youLabel: 'You',
  sourceUnavailableText: 'This source could not be loaded.',
  browseIncludedLabel: 'Browse included texts',
  noSupportedAnswerText: 'No supported answer found in the included texts.',
  newChatHeading: 'What would you like to research?',
  suggestionSelfQuestion: "What is the Buddha's view on speculation about the self?",
  suggestionWrongViewsQuestion: 'How does DN 1 classify wrong views?',
  corpusFooterText: 'Corpus v0.1 · DN 1 only',
  dighaNikayaLabel: 'Dīgha Nikāya',
  sourcesLabel: 'Sources',
  noSourcesUsed: 'None used',
  sourceGraphLabel: 'Source graph',
  evidenceMatrixLabel: 'Evidence matrix',
  openInReaderLabel: 'Open in Reader',
  editAndBranchLabel: 'Edit and branch',
  stoppedText: 'Stopped. Nothing was saved.',
  whatWeSearchedLabel: 'What we searched',
  corpusVersionLabel: 'Corpus version',
  passagesRetrievedLabel: 'Passages retrieved',
  whyNotLabel: 'Why not',
  continueHeading: 'Continue',
  coverageHeading: 'What the database covers',
  coverageNote:
    'Answers can only draw on filled squares. Everything else is reported as not found in the included texts.',
  toolVerifyTitle: 'Verify a quote',
  toolVerifyText: 'Is this saying in the early texts?',
  toolReaderTitle: 'Read DN 1',
  toolReaderText: 'Pali and translation side by side',
  toolTermsTitle: 'Look up a term',
  toolTermsText: 'Glosses and where it occurs',
  toolCompareTitle: 'Compare passages',
  toolCompareText: 'Two passages, shared terms',
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
  checkDocumentIntro:
    'Upload or paste an article, essay or PDF. We find the sayings attributed to the Buddha and check each one against the included texts.',
  documentDropTitle: 'Drop a file here, or choose one',
  documentDropHint: '.txt, .pdf or .docx, up to 10 MB',
  documentTextLabel: 'Or paste text',
  documentTextPlaceholder: 'Paste the text you want checked.',
  documentSearchScope: 'Searches the included texts only (DN 1).',
  checkQuotesLabel: 'Check quotes',
  checkingQuotesLabel: 'Checking…',
  documentResultHeading: 'Result (sample)',
  documentResultLabel: 'Result of the document check',
  exportReportLabel: 'Export report',
  sayingColumnHeader: 'Saying in your text',
  resultColumnHeader: 'Result',
  closestPassageColumnHeader: 'Closest passage',
  outcomeVerbatimLabel: 'Verbatim',
  outcomeCloseParaphraseLabel: 'Close paraphrase',
  outcomeNotFoundLabel: 'Not found in the included texts',
  noClosestPassageText: 'None in DN 1',
  verifyPageIntro:
    'Paste a saying attributed to the Buddha. We check whether it appears in the included texts.',
  verifyTextLabel: 'Quote',
  verifyPlaceholder: 'Paste the saying you want to check.',
  verifyScope: 'Searches the included texts only.',
  checkQuoteLabel: 'Check quote',
  quoteTabsLabel: 'Result states (preview only)',
  quoteTabFoundLabel: 'Found verbatim',
  quoteTabCloseLabel: 'Close paraphrase',
  quoteTabNoneLabel: 'Not found in the included texts',
  verifySampleQuote: 'Sample quote pasted by the reader appears here.',
  documentSampleText:
    'Sample paragraph from an article. The author attributes "sample saying one" to the Buddha, and later adds "sample saying two" without a source.',
  verifyResultLabel: 'Result of the quote check',
  yourQuoteLabel: 'Your quote',
  closestPassageLabel: 'Closest passage',
  trustTitle: 'Why should I trust this?',
  sampleMarker: 'Layout sample',
}

export const wording = { ...fromBackend, ...fromFrontend }

export type Wording = typeof wording

function pluralize(count: number, singular: string, plural: string): string {
  return `${count} ${count === 1 ? singular : plural}`
}

type ProcessFacts = {
  works: string[]
  retrievedCount: number
  // Claims whose quoted words were found in the texts.
  verifiedCount: number
  // Claims that are shown but whose quote could not be checked.
  notVerifiedCount: number
  removedCount: number
}

// The one line above the steps, for example "Searched DN 1 · 5 passages · 2 claims verified · 1 removed".
export function processSummaryText(facts: ProcessFacts): string {
  const parts = [
    `Searched ${facts.works.join(', ')}`,
    pluralize(facts.retrievedCount, 'passage', 'passages'),
    `${pluralize(facts.verifiedCount, 'claim', 'claims')} verified`,
  ]
  if (facts.notVerifiedCount > 0) {
    parts.push(`${facts.notVerifiedCount} not verified`)
  }
  if (facts.removedCount > 0) {
    parts.push(`${facts.removedCount} removed`)
  }
  return parts.join(' · ')
}

// Why the system did not answer, in plain words. Calm, never an apology.
export const abstentionReasonText: Record<AbstentionReason, string> = {
  [AbstentionReason.weakEvidence]: 'No passage matched closely enough.',
  [AbstentionReason.notEnoughVerifiedClaims]:
    'Claims were drafted, but too few passed the check against the texts.',
}

export const matchedByText: Record<MatchedBy, string> = {
  [MatchedBy.words]: 'Exact words',
  [MatchedBy.similarText]: 'Similar meaning',
}

export function removedClaimsText(removedCount: number): string {
  return `${pluralize(removedCount, 'claim', 'claims')} removed because the quote could not be found in the included texts.`
}

export function graphShowingText(nodeName: string): string {
  return `Showing: ${nodeName}`
}

export function graphRelationText(fromLabel: string, toLabel: string, stateText: string): string {
  return `${fromLabel} to ${toLabel}: ${stateText}`
}

export function searchResultsText(resultCount: number): string {
  return pluralize(resultCount, 'result', 'results')
}

export function slashMenuStatusText(commandCount: number): string {
  return `${pluralize(commandCount, 'command', 'commands')}. Use the up and down arrows.`
}

export function coverageSummaryText(includedCount: number, totalCount: number): string {
  return `${includedCount} of ${totalCount} suttas`
}

export function chatOptionsText(chatTitle: string): string {
  return `Options for ${chatTitle}`
}

export function removeFileText(fileName: string): string {
  return `Remove ${fileName}`
}

export function answerToText(question: string): string {
  return `Answer to: ${question}`
}

export function answerReadyText(claimCount: number): string {
  return `Answer ready, ${pluralize(claimCount, 'claim', 'claims')}`
}

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

export function documentFileChosenText(fileName: string): string {
  return `Chosen: ${fileName}`
}

export function foundVerbatimCountText(count: number): string {
  return `${count} found verbatim`
}

export function closeParaphraseCountText(count: number): string {
  return `${count} close ${count === 1 ? 'paraphrase' : 'paraphrases'}`
}

export function notFoundCountText(count: number): string {
  return `${count} not found in the included texts`
}
