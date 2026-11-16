# 04 Domain molecules

## 1. Goal
Build the 25 domain molecules in `src/components/molecules/`, plus the two things they stand on: the shared domain types (`src/domain`) and the fixed wording module (`src/wording`). Molecules are the first components that know what a passage, claim, citation or note is. Covers build-order step 4 (first half). Inventory: `docs/references/components.md`. Rules: skills `evidence-ui-integrity`, `atomic-design-conventions`. Visual source: `docs/prototypes/workspace.html`.

## 2. Design
- **Layers.** Molecules import atoms (`@ds/atoms/...`), types from `@domain`, and fixed copy from `@wording`. They never import `@api`, organisms, templates or pages (ESLint already enforces it). They receive data and callbacks through props and do not fetch.
- **`src/domain`** holds the types that mirror the backend (`docs/references/api-contract.md`): `AnswerStatus`, `EvidenceLabel`, `AbstentionReason`, `AnswerSource`, `VerifiedClaim`, `Answer`, plus the fields marked NEEDS BACKEND (`matchedBy`, `similarity`, `used`, `edition`, `translator`, `checksum`, `location`, `terms`, `droppedClaimCount`, `depth`, `DeepReport`). Frontend-only types go here too: `EvidenceState`, `Note`, `ChatSummary`. Field names are camelCase as in the contract. Skill: `api-contract-mirroring`.
- **`src/wording`** holds every fixed string from `docs/references/wording.md`, as one typed object. The backend group is copied verbatim and a test pins it. No molecule writes evidence or abstention copy inline.
- **`EvidenceState`** is the one place that turns a state into a shape and words:
  `directQuote` = filled, `notVerified` = hatched, `notUsed` / `removed` / `notEstablished` / `notYetIncluded` = dashed. Each also has its text from `@wording`. `EvidenceGlyph` draws the square, `EvidenceTag` draws square plus text (built on the `Tag` atom), and everything that shows evidence uses these two. Never color alone.
- **Quote style belongs to one component.** Only `PassageQuote` uses the accent rule and reading serif. `SystemExplanation` and `SuggestionBlock` are visibly labelled system text and never look like a quotation.
- **Gaps are written out.** A passage with no translator shows `translatorMissing`, never blank.
- **Constants.** States and codes are `const` objects in `src/domain` (`EvidenceState`, `EvidenceShape`, `AnswerStatus`, `EvidenceLabel`, `AbstentionReason`, `AnswerDepth`, `MatchedBy`); molecules never compare against loose strings. Numbers have names with their unit. Skill: `simple-code-conventions`, "Constants".
- Every molecule has a story (every evidence state, light and dark, phone width) and a test (behaviour by role; the state shows glyph and text; system text shows its label), plus `vitest-axe`. Each runs through `wording-auditor` at the review gates.

## 3. Reuse
Atoms: `Tag`, `Chip`, `Link`, `Text`, `IconButton`, `Icon`, `FactList`, `Disclosure`, `Divider`, `Stamp`, `Meter`, `Menu`, `HoverCard`, `Popover`, `Select`, `SegmentedControl`, `Textarea`. Existing `Chip` aria-disabled work lands here (see 4, batch B).

## 4. Batches (each ends with typecheck, lint, test, build-storybook green)
**0. Foundations.** `src/domain` types and `src/wording` (with the pinned-copy test) and fixture-free story helpers. Add `Layout sample` marker to the wording.
**A. Evidence core.** `EvidenceGlyph`, `EvidenceTag`, `PassageQuote`, `SystemExplanation`, `Notice` (abstention), `CiteLink`, `FootnoteMarker`.
**B. Chips and inline marks.** `SourceChip`, `ContextChip`, `FileChip`, `GlossChip`, `TermLink`, `Legend`, `CoverageStrip`. Decision carried over from plan 03: a disabled chip (a text planned but not in the corpus) becomes `aria-disabled` with a hidden reason, so it stays focusable and explains itself; `SourceChip` and `CoverageStrip` are its first users. `TermLink` uses `HoverCard`, so its trigger must be a real link (touch has no hover).
**C. Answer chrome.** `ActionBar`, `FeedbackActions`, `VersionSwitcher`, `SectionStepper`, `SuggestionChips`, `StreamingSteps`.
**D. Reader and rail.** `SelectionToolbar`, `NoteCard`, `SuggestionBlock`, `ChatRow`, `CommandItem`.

## 5. Decisions to settle on the way
- **Inverse surfaces.** `SelectionToolbar` is the first inverse surface with controls in it. Add `--color-inverse-focus` first (dark focus blue on the inverse background is 2.0:1).
- **Evidence state names** in the UI versus the backend `EvidenceLabel` (`DIRECT`, `UNVERIFIED`): a small mapper in `src/domain`, not scattered `if`s.
- **Citation IDs** such as `pitaka_lk:dn-1:44:5` are shown in mono; the display form (`DN 1 §44.5`?) is not known until the real section structure exists. `CiteLink` takes both the ID (for the link) and a display text from the caller.
- **Real DN 1 structure** is still needed for the Reader (plan 06); molecules use sample text marked `Layout sample`.

## 6. Review gates
`design-system-reviewer`, `a11y-auditor` and `wording-auditor` after batch A (the evidence rules live there) and after batch D.

## 7. Verification
`npm run lint`, `typecheck`, `test`, `build-storybook`. In Storybook every evidence state shows glyph and words, in light and dark and at 400px; a quote never looks like system text; abstention is dashed and calm and never red; a keyboard-only pass over the chips, toolbars and menus.

## 8. Out of scope
Organisms (plan 05), templates, pages, the API client and MSW fixtures built from the `Answer` model (plan 05 uses them).

## 9. Status
- Batch 0 (domain types, wording, evidence state mapping) done. `getEvidenceShape` written by the user.
- Batch A done and reviewed by `design-system-reviewer`, `a11y-auditor` and `wording-auditor`: EvidenceGlyph, EvidenceTag, PassageQuote, SystemExplanation, Notice, CiteLink, FootnoteMarker. New atom `GlyphSquare` (shared by `Tag` and `EvidenceGlyph`).
- Decisions made in batch A: the system box keeps the 17px reading serif as in the approved prototype (the grey box and its label set it apart from a quote). `Notice` always shows the abstention scope note for "not established". `PassageQuote` requires a language. `SystemExplanation` requires a label.

Open items carried forward:
- `verifyDisclaimer` hard-codes "(DN 1)". Make it a function of the included texts when the corpus grows (plan 05, Verify page).
- `CiteLink` may need `aria-haspopup` once an organism decides what `onOpen` does.
- `FootnoteMarker` name "Source 2" vs visible "[2]": brackets are ignored by voice control, so it passes; recheck with a real screen reader.
- Check the forced-colors look of `PassageQuote` and `GlyphSquare` once in Edge (code reading only so far).
- Batch B done: SourceChip, ContextChip, FileChip, GlossChip, TermLink, Legend, CoverageStrip. New atom `RemovableChip` (label with a remove button, shared by ContextChip and FileChip). `Chip` can now be unavailable (`unavailableReason`): it uses `aria-disabled`, stays focusable and says the reason in words (closes the plan 03 open item). `SourceChip` and `CoverageStrip` are its first users. Reviewers run at the batch D gate.
