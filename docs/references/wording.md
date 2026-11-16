# Wording reference

All fixed copy about answers, evidence and abstention comes from `src/wording` (one module). The first group is copied from the backend (`../quote-buddha/src/quote_buddha/answering/wording.py`) and must stay identical. Skill: `evidence-ui-integrity`.

## From the backend (do not change)
| Key | Text |
|---|---|
| `abstentionText` | The early texts included in this database do not establish this. |
| `abstentionScope` | No supporting passage was found in the included corpus by these methods. This does not show that the Buddha did not teach it. |
| `questionHeading` | Question |
| `simpleAnswerHeading` | Simple answer |
| `simpleAnswerLabel` | The system's own explanation of the passages below. It is not a quotation, and it has not been checked against the texts. Only the quoted words are checked. |
| `passagesHeading` | Passages from the included early texts |
| `sourceHeading` | Source |
| `paliLabel` / `sinhalaLabel` | Pali / Sinhala |
| `foundHeading` | Quoted words found in the included early texts |
| `foundYes` | yes (the quoted words were found in the included corpus; the explanation is the system's own) |
| `samePassageNote` | (same passage) |
| `foundNo` | no (not found in the included corpus by these methods; this does not show that the Buddha did not teach it) |

## Added by the frontend (shown in the approved prototype)
| Key | Text |
|---|---|
| `foundTag` | Found in the included texts |
| `notEstablishedTag` | Not established |
| `scopeNote` | Found in the included texts only. A missing answer does not mean the Buddha did not teach it. |
| `partialCorpusNote` | The database currently includes only part of the early texts. |
| `directQuote` | Direct quote |
| `notVerified` | Not verified |
| `notUsed` | Not used |
| `removed` | Removed |
| `notYetIncluded` | not yet included |
| `notYetIncludedTag` | Not yet included |
| `sourceLabel` | Source |
| `helpfulLabel` / `notHelpfulLabel` | Helpful / Not helpful |
| `previousVersionLabel` / `nextVersionLabel` | Previous version / Next version |
| `previousSectionLabel` / `nextSectionLabel` | Previous section / Next section |
| `stepsLabel` | Steps so far |
| `askFailedText` | Something went wrong while answering. Please try again. |
| `feedbackLabel` | Rate this answer |
| `versionsLabel` / `sectionsLabel` | Question versions / Section |
| `copyAnswerLabel`, `askAgainLabel`, `saveToNotebookLabel`, `shareLabel` | Copy answer, Ask again, Save to notebook, Share |
| `addNoteLabel`, `clarifyLabel`, `askAboutThisLabel`, `copyCitationLabel` | Add a note, Clarify the meaning, Ask about this, Copy citation |
| `removeContextLabel`, `evidenceKeyLabel`, `answerActionsLabel`, `selectedTextLabel`, `exampleQuestionsLabel` | Remove context, Evidence key, Answer actions, Selected text, Example questions |

System-written text (notes, suggestions, clarifications) uses the hatched square, the same shape as "Not verified". This is deliberate: both mean "not checked against the texts".
| `useSuggestionLabel` / `discardSuggestionLabel` | Use suggestion / Discard |
| `translatorMissing` | Translator: not recorded in source |
| `parallelsNotChecked` | Parallel text: not checked yet |
| `systemLabel` | Written by the system, not a quotation. Check it against the passage. |
| `suggestionLabel` | Suggested by the system |
| `aiEnhancedTag` | AI-enhanced |
| `originalNote` | Your original |
| `answersCanBeWrong` | Answers can be wrong. Check the sources. |
| `verifyDisclaimer` | Results cover the included texts only (DN 1). Not found does not mean the Buddha did not say it. |
| `verifyFound` | Found verbatim in the included texts |
| `verifyClose` | Close paraphrase found |
| `verifyCloseNote` | The wording differs from the passage. This is not the exact wording preserved in the included texts. |
| `verifyNone` | Not found in the included texts |
| `verifyNoneText` | We could not find this quote or a close paraphrase in the included texts. |
| `trustTitle` | Why should I trust this? |
| `sampleMarker` | Layout sample |

### Chat (plan 05, step B)
| Key | Text |
|---|---|
| `productName` | Quote Buddha |
| `youLabel` | You |
| `sourceUnavailableText` | This source could not be loaded. |
| `browseIncludedLabel` | Browse included texts |
| `noSupportedAnswerText` | No supported answer found in the included texts. |
| `answerToText(question)`, `answerReadyText(n)` | Answer to: …, Answer ready, 2 claims |
| `attributedToBuddhaIn(work)`, `versionPositionText`, `sectionPositionText` | attributed to the Buddha in DN 1, Version 2 of 3, Section 2 of 12 |
| `evidenceStateText` | The words next to each evidence shape (from the table above) |
| `newChatHeading` | What would you like to research? |
| `sourcesLabel` / `noSourcesUsed` | Sources / None used |
| `sourceGraphLabel`, `evidenceMatrixLabel`, `openInReaderLabel`, `editAndBranchLabel` | Source graph, Evidence matrix, Open in Reader, Edit and branch |
| `stoppedText` | Stopped. Nothing was saved. |
| `whatWeSearchedLabel`, `corpusVersionLabel`, `passagesRetrievedLabel`, `whyNotLabel` | What we searched, Corpus version, Passages retrieved, Why not |
| `continueHeading`, `coverageHeading` | Continue, What the database covers |
| `coverageNote` | Answers can only draw on filled squares. Everything else is reported as not found in the included texts. |
| `toolVerify*`, `toolReader*`, `toolTerms*`, `toolCompare*` | The four tool cards on the new chat page (title and one line each) |
| `abstentionReasonText` | No passage matched closely enough. / Claims were drafted, but too few passed the check against the texts. |
| `processSummaryText(...)` | Searched DN 1 · 5 passages · 1 claim verified · 1 not verified · 1 removed |

## Rules
- Attribution: "attributed to the Buddha in DN 1". Never "the Buddha said" for unverified or system-written content.
- "Not found" always includes "in the included corpus" or "in the included texts".
- Abstention is never red, never an apology, always with the scope note.
- System-written text (simple answer, clarification, AI-enhanced notes, Ask answers) always carries `systemLabel` or the `simpleAnswerLabel`.
- Sample and placeholder text is marked `sampleMarker` and never pairs a real quotation with a made-up citation.
- When the backend changes its wording, update this file and `src/wording` together.
