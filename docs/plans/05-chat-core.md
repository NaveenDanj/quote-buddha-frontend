# 05 Chat core: data, organisms, templates and the first pages

## 1. Goal
Make the chat work end to end on mock data: ask a question, watch the steps stream in, read an answer with checkable citations (or an honest abstention), open the research panel and the source graph, and start a new chat. Covers build-order steps 4 (second half) and 5 of `00-overall-plan.md` for the pages `NewChat` and `Conversation`. Visual source: `docs/prototypes/workspace.html` (new chat, conversation, research panel, source graph dialog). The Reader, Verify, Terms, Compare, Notebook and CheckDocument pages come in later plans.

## 2. Design
**Data flow.** Only pages fetch. A page calls a hook from `src/api`, gets plain data, and passes it down as props to templates and organisms. Organisms, molecules and atoms never import `@api`.

**`src/api`** (new):
- `client.ts`: `askQuestion(request, onEvent, signal)` posts to `/api/v1/ask` with `fetch` and reads the response body as a stream. `EventSource` cannot send a POST body, so `readServerSentEvents` parses the `event:` and `data:` lines itself. Pure parser, tested.
- `useAnswerStream.ts`: the hook the Conversation page uses. State is one `kind` union (`idle | streaming | answered | abstained | stopped | failed`), not several booleans. Supports stop (abort), and keeps the steps that arrived.
- `useChats.ts`: chats live in memory for now (no accounts yet): a list of `{ id, title, messages }`, edit and branch later. Settings (theme, reading size) use `localStorage` with the safe fallback already built in `useTheme`.
- `fixtures/`: answered quick, answered deep, abstained for each reason, streaming, stopped, error, empty corpus, a passage with a missing translator, DN 1 only coverage. Built from `@domain` types, sample text marked `Layout sample`, never a real quotation with a made-up citation.
- `mocks/handlers.ts`: MSW handlers, including a streaming `/ask` that emits the step events with short delays and then the answer. Stories and tests reuse the same handlers.
- The wire types stay in `@domain`; `src/api` maps nothing (names already match the contract).

**Derived data (pure functions in `src/domain`, with tests).** `deriveEvidenceMatrix(answer)` (claims as rows, retrieved passages as columns, an `EvidenceState` in each cell) and `deriveSourceGraph(answer)` (answer, claims, citations and text nodes, with the line style carried by `EvidenceState`). The backend sends no matrix or graph; the frontend derives them. The graph has a text-list alternative.

**Routing and providers.** React Router: `/` (NewChat), `/chat/:chatId` (Conversation). A `QueryClientProvider` and the theme applied at start (already done in `main.tsx`).

**Organisms** (`src/components/organisms/`, stories only, no tests):
- Chat: `UserMessage`, `AssistantMessage` (steps while streaming, then `SystemExplanation`, claims with `FootnoteMarker`, source chips, `ActionBar`, `FeedbackActions`), `ClaimList`, `AbstainNotice` (fixed backend text plus scope note, a next step), `NewChatHero`.
- Research panel: `ResearchPanel` (Tabs: Sources, Evidence, Terms, Notes), `EvidenceMatrix` (with `Legend`), `SourceDetails` (`FactList`: edition, translator or "Translator: not recorded in source", checksum, location), `StarGraph` (SVG, simple star: answer, claims, citations, text), `SourceGraphDialog` (two columns: graph left, details right, fixed height).
- Shell: `Composer` (+ `SlashMenu`, depth chips, attach, `FileChip`, `ContextChip`, send turns into stop while streaming), `Rail` (+ `ChatHistory` with `ChatRow`), `TopBar`.
- Deferred to later plans: `DeepReport` (deep answers show the plain answer for now), `ShareDialog`, `ReportCitationDialog`, `SettingsDialog`, `CommandPalette` and everything in the Reader and Tools groups.

**Templates** (`src/templates/`, layout only, stories only): `AppShell` (rail, top bar, main, optional docked panel), `ChatLayout` (thread and sticky composer, chat column 920px), `CenteredHeroLayout`.

**Pages** (`src/pages/`): `NewChat` and `Conversation`. Page stories load MSW handlers for each fixture state.

**Rules that must hold** (skills `evidence-ui-integrity`, `reader-and-notes-ux`): a failed claim never appears as supported; abstention is dashed, calm and carries the scope note; system text is labelled; every citation chip opens a source record or shows a calm error, never an empty card; icons not text for repeated actions, no tooltips; constants not loose strings; few comments.

## 3. Reuse
All 25 molecules and 34 atoms. `Surface` for every panel. `useTheme` for the theme. `@wording` for all fixed copy (add the keys the organisms need: chat headings, composer placeholders, panel tab names). `docs/references/api-contract.md` for every type.

## 4. Steps (each ends with typecheck, lint, test, build-storybook green)
**A. Data foundations.** `deriveEvidenceMatrix` and `deriveSourceGraph` (tests); the server-sent-events parser (tests); fixtures; MSW handlers with a streaming `/ask`; `askQuestion`; `useAnswerStream` (tests with MSW); `useChats`. Router and providers. Skills: `api-contract-mirroring`, `component-testing`, `react-typescript-practices`.
**B. Answer organisms.** `AbstainNotice`, `ClaimList`, `UserMessage`, `AssistantMessage`, `NewChatHero`. Stories for every fixture state (streaming, stopped, answered, abstained, error).
**C. Research panel.** `EvidenceMatrix`, `SourceDetails`, `ResearchPanel`, `StarGraph`, `SourceGraphDialog`.
**D. Shell.** `Composer` with `SlashMenu`, `Rail` with `ChatHistory`, `TopBar`.
**E. Templates and pages.** `AppShell`, `ChatLayout`, `CenteredHeroLayout`; pages `NewChat` and `Conversation`; wire the routes; keyboard-only pass.

## 5. Decisions to settle on the way
- **Chat state before accounts.** In memory, lost on reload, as the plan says. Is that acceptable for the first phase, or should chats persist in `localStorage` already? (Plan: in memory; revisit with accounts.)
- **Graph layout.** A fixed star layout (answer in the centre, claims on a ring, citations and text outward) is enough for a few claims. Crowding with many claims is a later problem; the text list is the fallback.
- **Matrix and graph derivation** are the core logic of this plan and a good place for the user to write the function (a Learn by Doing hand-off) because they decide what "supported" looks like.
- **Citation display form.** `pitaka_lk:dn-1:44:5` shown as `DN 1 §44.5`? Needs the real section structure. Fixtures use clearly marked sample forms until then.
- **Backend request plan.** Write `../quote-buddha/docs/plans/05-api-endpoints.md` from the "NEEDS BACKEND" items before step A starts, so the contract the mocks follow is also a request the backend can read.

## 6. Review gates
`design-system-reviewer`, `a11y-auditor` and `wording-auditor` after step B (answer organisms) and after step E (pages). `a11y-auditor` also after step C (the graph and its text alternative) and after step D (the composer).

## 7. Verification
`npm run lint`, `typecheck`, `test`, `build-storybook`, `npm run dev`. In the running app: ask a question and watch the steps; stop mid-stream; get an answer with working citation chips; get an abstention (dashed, calm, scope note, never red); open the research panel and the graph; start a new chat; keyboard only for all of it; phone width 400px with no horizontal scroll; light, dark and Windows high contrast; side by side with `workspace.html`.

## 8. Out of scope
Reader, Verify, Terms, Compare, Notebook, CheckDocument, share and report dialogs, settings dialog, command palette, deep research report, accounts, saving chats to a server, the real API (plan 07).

## 9. Status
- Step A (data foundations) built, except two pieces that move to step E because they need the pages: React Router and `useChats` (chats in memory, as decided). Built: `@domain` evidence matrix and source graph derivation, the server-sent-events reader, `askQuestion`, `useAnswerStream` (idle, streaming, answered, abstained, stopped, failed), fixtures from builders, and an MSW `/ask` handler that streams the same events as the real backend.
- `getMatrixCellState` in `src/domain/evidenceMatrix.ts` is written by the user. Its tests (and the source graph tests that use it) fail until it is.
- Still to decide: chats in memory (assumed yes), and whether to write `../quote-buddha/docs/plans/05-api-endpoints.md` before the pages (assumed yes, later).
- Step B done and reviewed (wording, design-system, a11y): AbstainNotice, ClaimList, UserMessage, AssistantMessage (with its private parts), NewChatHero. `StreamState` and `AskError` live in `@domain`. Organisms may use smaller organisms (AssistantMessage uses ClaimList and AbstainNotice), never templates or pages. Stories may import mock data from `@api`.
- Decisions in step B: "Found in the included texts" is shown only when at least one quote was really found; otherwise "Not verified". The process line counts verified and not-verified claims separately. A failed answer always shows our own calm text, never the server's message. Each answer is an article with a hidden heading ("Answer to: ...") and one status line that announces each stage.

Open after step B:
- **Tool cards and recent chats** are buttons; they should be links when the router exists (step E).
- **Control size** 28px vs the 32px rule is still undecided.
- **Inline edit** of a user message is not built (the button calls `onEdit`; the page decides).
- **Hero and `SourceChip` names** (a tool card's name runs title and description together; give the description `aria-describedby`).
- Step C done and reviewed (a11y, design-system): SourceDetails, EvidenceMatrix, StarGraph, SourceGraphDialog, ResearchPanel. Domain: `layoutSourceGraph` (four columns, tested), `GraphNode` as a union by kind, `getMatrixCellState` (written by the author, tests pin it). `DataTable` has a `rowHeaderKey`. New tokens: `--layout-graph-height`, `--border-selected`.
- Deliberate differences from the prototype: no column headers above the graph (each box carries its kind label and its evidence state in words and shape); the legend shows evidence tags, not line samples.

Open after step C:
- **Matrix first column** is not sticky and has no minimum width; on a phone the claim text scrolls away with the table.
- **Sources tab numbers:** the list shows no numbers, while the matrix headers say "1 · DN 1".
- **Dialog fixed height** (`--layout-graph-height`) can nest a scroll with the overlay on short landscape screens.
- **Line legend:** the graph's line styles (solid, dashed, dotted) are not shown in the key.
- **Control size 28px vs 32px** is still undecided (close buttons, chips).
- Step D done and reviewed (a11y, design-system): Composer (PromptBox, AttachmentChips, OptionsRow, `useSlashMenu` with 9 tests), SlashMenu, Rail (ToolLinks), ChatHistory, TopBar. Domain: `slashCommands` (name and label, tested). New `@keyboard` module for key names. `Surface` has an `outlined` look. Composer decisions: the text box is a plain textarea (not a combobox), Enter sends on a keyboard and adds a line on a touch screen, Tab never chooses a command, a status line announces the slash menu and the answer starting, Escape stops at the menu.

Open after step D:
- **`SelectableRow` atom:** the left-bar row look is written four times (Rail tool links, ChatRow, ListRow, CommandItem). Share it when step E is done.
- **Tool links and recent chats** are buttons. Make them links once the router exists (step E).
- **Template duties for step E:** hide the closed rail from the tab order (`hidden` or `inert`, not only translated) and give the drawer a scrim, Escape, focus in and focus back to the Menu button; place the TopBar `header` as a sibling of `main`; give the scroll container `scroll-padding-top` for the sticky top bar.
- **Control size** 28px vs 32px is still undecided.
- **Inline edit** of a user message is not built.
