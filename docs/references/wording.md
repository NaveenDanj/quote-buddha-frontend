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

## Rules
- Attribution: "attributed to the Buddha in DN 1". Never "the Buddha said" for unverified or system-written content.
- "Not found" always includes "in the included corpus" or "in the included texts".
- Abstention is never red, never an apology, always with the scope note.
- System-written text (simple answer, clarification, AI-enhanced notes, Ask answers) always carries `systemLabel` or the `simpleAnswerLabel`.
- Sample and placeholder text is marked `sampleMarker` and never pairs a real quotation with a made-up citation.
- When the backend changes its wording, update this file and `src/wording` together.
