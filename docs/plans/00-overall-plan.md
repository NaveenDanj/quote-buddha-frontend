# Quote Buddha Frontend: Design System, Components, and `.claude` Setup

## Context
`quote-buddha/` is a backend-only repo (FastAPI, Postgres + pgvector, evidence-grounded RAG over the Pali Nikāyas; only DN 1 is loaded; `/ask` and `/verify-quote` are planned, only `/health` exists). There is no frontend.

Over this session the user approved a UI, built as clickable prototypes:
- **Design system preview** (minimal, near-monochrome, IBM Plex, one accent): `quote-buddha-brand.html`
- **Workspace prototype** (chat-first research app with a research panel, source-graph dialog, full-width Reader, tools): `quote-buddha-app.html`

Both live in the session scratchpad and will be copied into the new repo as the visual source of truth (`docs/prototypes/`). The user said the UI is good for the first phase and asked for: a design-system audit, the complete component list, then a plan and the `.claude` setup.

## Decisions already made
- **Repo:** new, separate: `C:\projects\side projects\quote-buddha-project\quote-buddha-frontend` (own `git init`; sibling of the backend repo).
- **Stack:** React 19 + Vite + TypeScript (strict), Tailwind v4 `@theme` over CSS variables, Storybook 10, Vitest + Testing Library + MSW, TanStack Query, React Router. **Radix primitives** (unstyled) for Dialog, Menu, Popover, HoverCard, Tabs, Select, Toast so focus-trapping and keyboard handling aren't hand-rolled. **lucide-react** wrapped by one `Icon` atom (replaces the prototype's hand-drawn sprite; same line style, stroke 1.6).
- **Atomic rule:** `design-system/` holds domain-neutral atoms and tokens. Anything that knows about passages, claims or citations lives outside it in `components/`.
- **Look:** near-monochrome, IBM Plex (Serif reading, Sans UI, Mono for citation IDs), one accent (burnt orange, used only for quotes, the verified evidence path and focus), 2px corners, no shadows, hairline rules. State is never carried by color alone (filled / hatched / dashed glyphs plus text). **No tooltips**; icon buttons keep an `aria-label`.
- **Language:** English first. Font stacks already end in Noto Sinhala fallbacks.

## Design-system audit
The approved design system covers the basics. The prototype grew well past it.

**Holds up as is:** colors, type roles, 4px spacing scale, 2px radius, Button (primary/secondary/text), Tag glyphs, Input, Chip, citation link, passage quote, table, fact list, tabs, light/dark themes.

**Gaps found (189 CSS classes in the app vs 49 in the design system):**

| Gap | Fix |
|---|---|
| No icon system, and many actions were text | Add `Icon` + `IconButton` (sm/md, solid, pressed), 38 icons mapped to lucide |
| 12 different `z-index` values (5 to 90) | Replace with a named scale: `rail 20, topbar 30, panel 50, dialog 70, menu 80, toast 90` |
| 5 ad-hoc breakpoints (760/860/900/1000/1100) | Consolidate to three: `sm 760`, `md 900`, `lg 1100` |
| Layout sizes hard-coded (rail 252, panel 380/440, reader outline 220, top bar 52) | Layout tokens |
| Overlay colors as literals (`rgb(0 0 0 / .5)`, toast and selection bar inverse colors) | `--color-scrim`, `--color-inverse-bg`, `--color-inverse-text` |
| Hatched/dashed evidence patterns re-implemented in CSS and in SVG | One `--pattern-hatch` token plus an SVG `<pattern>` helper used by `EvidenceGlyph` and `StarGraph` |
| Reading size is a user setting (`--rs` multiplier) | Token `--reading-scale` and a reading type scale defined with `calc()` |
| No Select, Checkbox, Textarea, Dialog, Menu, Popover, HoverCard, Toast, DropZone, Skeleton, Meter | New atoms (below) |
| Focus ring and motion defined per component | `--focus-ring`, `--motion-fast/base`, global `prefers-reduced-motion` |
| Text (Pali) needs its own role | `Text` variant `pali` with `lang="pi"` and diacritic-safe font stack |

**Contrast to verify in Storybook (a11y addon):** accent `#A8480A` as text on white and on `#F4F4F4`, muted text on subtle surfaces, dark-theme accent `#E8964A`, the 12px accent footnote markers.

## Tokens (complete list)
Color (semantic only: page, surface-subtle, text, text-muted, border, accent, danger, focus, scrim, inverse-bg, inverse-text) · Typography (3 families; display, h1–h3, reading, ui, caption, code, pali; `--reading-scale`) · Spacing (`s1`–`s8`) · Radius (`2px`, pill unused) · Border/hairline · Z-index scale · Layout (rail, topbar, panel-sm/lg, reader-outline, content widths, measure `62ch/110ch`) · Breakpoints (sm/md/lg) · Motion (fast/base, reduced-motion) · Evidence patterns (filled, hatched, dashed) · Icon sizes (16/18/20).

## Complete component list
**Design system (`src/design-system/`, domain-neutral, 32 items + token docs)**
- Primitives and form: `Icon`, `IconButton`, `Button`, `Link`, `Text` (heading/body/reading/pali/caption/code), `Input`, `Textarea`, `Select`, `Checkbox`, `Chip`, `Tag`, `CountBadge`, `Stamp` (mono label/kbd), `Divider`, `Mark`, `Skeleton`, `LiveDot`, `VisuallyHidden`, `Meter`, `DropZone`
- Structure: `Tabs`, `SegmentedControl`, `Disclosure`, `DataTable`, `FactList`, `Breadcrumbs`, `ListRow`
- Overlays (Radix): `Dialog`, `Menu`, `Popover`, `HoverCard`, `Toast`

**Domain molecules (`src/components/molecules/`, 25)**
`EvidenceGlyph`, `EvidenceTag`, `CiteLink`, `FootnoteMarker`, `TermLink`, `GlossChip`, `SourceChip`, `ContextChip`, `FileChip`, `PassageQuote`, `SystemExplanation` (the labelled "not a quotation" box), `Notice` (abstain), `ActionBar`, `FeedbackActions`, `VersionSwitcher`, `SectionStepper`, `Legend`, `CoverageStrip`, `SelectionToolbar`, `NoteCard`, `SuggestionBlock` (AI-written, labelled), `ChatRow`, `CommandItem`, `SuggestionChips`, `StreamingSteps`

**Organisms (`src/components/organisms/`, 35 including sub-parts)**
- Shell: `Rail` (+ `ChatHistory`), `TopBar`, `Composer` (+ `SlashMenu`, depth chips, attach)
- Chat: `UserMessage` (edit and branch), `AssistantMessage`, `ClaimList`, `DeepReport`, `AbstainNotice`, `NewChatHero`
- Research panel: `ResearchPanel` (Sources / Evidence / Terms / Notes), `EvidenceMatrix`, `SourceDetails`, `StarGraph`, `SourceGraphDialog`
- Dialogs: `ShareDialog`, `ReportCitationDialog`, `SettingsDialog`, `CommandPalette`
- Reader: `ReaderToolbar`, `SuttaPicker`, `SectionOutline`, `ReaderText` (+ `ReaderParagraph`), `NotesPane`, `NoteEditor` (AI enhance), `ClarifyPane`, `AskPane`
- Tools: `VerifyResult`, `DocumentResults`, `TermEntry`, `ComparePanel`, `NotebookView`, `CorpusCoverage`

**Templates (`src/templates/`, 5):** `AppShell` (rail + top bar + main + optional docked panel), `ChatLayout` (thread + sticky composer), `ToolLayout` (single column), `ReaderLayout` (toolbar + 3 columns + compact ask bar), `CenteredHeroLayout`

**Pages (`src/pages/`, 8):** `NewChat`, `Conversation`, `Reader`, `Terms`, `Compare`, `Notebook`, `Verify`, `CheckDocument`

## Frontend structure
```
quote-buddha-frontend/
  CLAUDE.md  .claude/{settings.json, agents/, skills/}
  docs/{plans/, references/{brand.md, components.md, api-contract.md, wording.md}, prototypes/}
  src/design-system/{tokens/, atoms/}   # tokens.css (primitive → semantic → @theme), dark theme
  src/components/{molecules/, organisms/}
  src/templates/  src/pages/  src/api/ (typed client, SSE, MSW handlers)  src/wording/
  .storybook/  (themes toolbar, a11y addon, viewport presets)
```
Rules enforced by ESLint `no-restricted-imports`: atoms import only tokens; molecules import atoms; organisms import molecules and atoms; templates are layout only; pages own data fetching. A grep gate fails the build on raw hex, `px` or `rem` outside `design-system/tokens`.

## Backend needs (to put in the backend repo's `docs/plans/05-api-endpoints.md`)
- `POST /api/v1/ask`: server-sent events (step events: searching, retrieved, drafting, verifying) then a final `Answer` with claims, citations, similarity, `matched_by`, edition/translator/checksum, terms, corpus version, depth (`quick|deep`), optional passage context, reader level.
- `POST /verify-quote` (three outcomes), `POST /check-document` (upload, async job).
- Texts: list, sections, passage by citation ID, neighbours. Terms: list and entry. `POST /clarify`, `POST /notes/enhance` (labelled system output).
- Later (needs auth): chats and messages as a tree (edit and branch), notes and notebooks, saved passages, feedback and citation reports, share links, settings.
- CORS and a stable error format. Until these exist, the frontend runs on MSW fixtures built from the `Answer` model.

## `.claude` setup (frontend repo; mirrors the backend's planner / implementer / reviewer pattern)
- `CLAUDE.md`: product summary, link to backend docs, atomic and import rules, token-only styling, wording rules (never "the Buddha said" for unverified text; "not found" means not found in the included corpus), icon-not-text and no-tooltip rules, commands, the planner → implementer → reviewer workflow.
- `settings.json`: allow `npm run lint|typecheck|test|build|storybook|build-storybook`, `npx vitest`, `npx tsc`, read-only git; deny reading `.env`.
- `agents/`: `frontend-planner` (writes `docs/plans/`), `frontend-implementer`, `design-system-reviewer` (tokens, boundaries, a11y), `a11y-auditor`, `wording-auditor` (attribution, abstention, labelling of system text).
- `skills/`: `simple-code-conventions` (KISS over clever one-liners; simple plain-English names for variables, functions, components, hooks, props, types and files; read first by every agent), `design-tokens`, `atomic-design-conventions`, `storybook-stories`, `react-typescript-practices`, `tailwind-v4-theming`, `component-testing`, `api-contract-mirroring`, `evidence-ui-integrity` (frontend twin of the backend's `rag-attribution-integrity`), `reader-and-notes-ux` (notes, AI-enhanced notes, labelling rules).
- `docs/prototypes/`: the two approved HTML prototypes (read-only reference for agents).

## Build order
0. Create repo, `.claude` setup, plan docs, copy prototypes.
1. Scaffold (Vite, Tailwind v4, Storybook, Vitest, lint rules, MSW).
2. Tokens and Foundations docs in Storybook; light and dark; contrast checked.
3. Design-system atoms (29–32 items) with stories, a11y checks, tests.
4. Domain molecules, then organisms for the chat core (Composer, messages, ResearchPanel, StarGraph dialog).
5. Templates and the first pages on MSW: `NewChat`, `Conversation`, `Verify`.
6. Reader (toolbar, text, outline, notes, clarify, ask).
7. Remaining tools: `Terms`, `Compare`, `Notebook`, `CheckDocument`, Settings, Command palette, Share and Report dialogs.
8. Wire to the real API as endpoints land; add auth-dependent features last.

## Verification
- `npm run storybook`: Foundations docs render every token; each atom story passes the a11y addon in light and dark.
- `npm run test`, `typecheck`, `lint` green, including the import-boundary rule (prove it by adding a deliberate bad import).
- Grep gate: no hex/px/rem literals outside `design-system/tokens`.
- `npm run build-storybook` succeeds.
- Visual diff each page against `docs/prototypes/quote-buddha-app.html`; MSW fixtures cover answered, abstained, streaming, stopped, error.
- Keyboard-only pass on dialogs, menus, the command palette, the Reader selection toolbar and the source graph.
