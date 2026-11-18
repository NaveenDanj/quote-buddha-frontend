# quote-buddha-frontend

The web app for Quote Buddha: a chat-first research workspace where people ask questions about the early Buddhist texts (Pali Nikāyas) and get answers backed by passages they can check. Researchers get extra tools around the chat: an evidence panel, a source graph, a full-width Reader with notes, terms, compare, and a document checker.

The backend is a separate repo at `../quote-buddha` (FastAPI, Postgres + pgvector). It owns the answers. This repo only shows them honestly.

**Wording rule (same as the backend):** say "attributed to the Buddha in DN 1", never "the Buddha said" for anything unverified or system-written. "Not found" means "not found in the included corpus", never "the Buddha did not say it". Details: `docs/references/wording.md`, skill `evidence-ui-integrity`.

## Visual source of truth
`docs/prototypes/design-system.html` (tokens and basic components) and `docs/prototypes/workspace.html` (the approved app: chat, research panel, source graph, Reader, tools). Open them in a browser. Match them. Do not redesign. If the prototype and the code disagree, the prototype wins unless the user says otherwise.

## Stack
React 19, Vite, TypeScript (strict), Tailwind v4 `@theme` over CSS variables, Storybook 10, Vitest + Testing Library + MSW, TanStack Query, React Router. Radix primitives (unstyled) for Dialog, Menu, Popover, HoverCard, Tabs, Select, Toast. `lucide-react` behind one `Icon` atom. Plan: `docs/plans/00-overall-plan.md`.

## Atomic design (strict)
```
src/design-system/   tokens + domain-neutral atoms. Knows nothing about passages, claims or citations.
src/components/molecules/   small domain parts built from atoms.
src/components/organisms/   larger domain sections built from molecules and atoms.
src/templates/       page layouts, no data.
src/pages/           the only place that fetches data.
```
Imports go one way only: atoms import tokens; molecules import atoms; organisms import molecules, atoms and smaller organisms; templates import organisms; pages import templates. ESLint enforces it. If a component knows what a passage, claim or citation is, it does not belong in `design-system/`. Details: skill `atomic-design-conventions`.

## Styling rules
- Tokens only. No hex colors, no raw `px`/`rem` values, no `z-index` numbers outside `src/design-system/tokens`. Use semantic tokens (`--color-text`), never the primitive palette. Skill: `design-tokens`, `tailwind-v4-theming`.
- **Spacing is named by purpose outside atoms.** Use `gap-related` (4px), `gap-group` (8), `gap-block` (12), `gap-section` (16), `gap-page` (24), `p-card-tight` (12), `p-card` (16), `p-page` (24), `py-area` (32), never `gap-3` or `p-6`. They are defined once in `tokens.css`, so one edit moves every box. Atoms and the token docs may use the numbered steps. `check:tokens` fails on numbered spacing anywhere else. Prefer `Surface` props (`padding`, `gap`, `rows`, `isScrollArea`) over spacing classes, and `Text isMuted` over `text-text-muted`.
- Look: near-monochrome, IBM Plex, one accent (quotes, the verified evidence path, focus), 2px corners, no shadows, hairline rules.
- State is never carried by color alone: use the evidence glyphs (filled, hatched, dashed) plus text.
- Light and dark themes must both work; check both in Storybook.

## UI rules
- Repeated actions use icons (`IconButton` with an `aria-label`). Primary actions that need a label keep their text ("Send report", "Check quotes", "New chat").
- **No tooltips.** Icon buttons rely on their accessible name only.
- Anything the system wrote itself (simple answers, clarifications, AI-enhanced notes) is visibly labelled as the system's own wording.
- Abstention ("not established") is a finding, not an error: dashed outline, calm copy, never red.
- A box that holds a group (a gray panel, a dashed notice, a framed card) uses the `Surface` atom, not a styled `div`. Raw `div`s are for plain layout only.
- **Layout never scrolls as a page.** The app fills the window (`#root` is `100dvh`, `overflow: hidden`, `position: relative`). Only named areas scroll: the chat messages, the research panel content, the rail. The composer, the top bar, the panel header and tabs sit outside every scroll area. Every scroll area is `relative`, because visually hidden text (`sr-only`) is absolutely positioned and otherwise escapes the clip and scrolls the whole page. Never use `min-h-screen` or `h-screen` for the shell, and check long content, an open panel and phone width before saying a layout is done.
- **Tailwind only makes a utility if its value is a token.** Spacing steps are named (`--spacing-0` to `--spacing-8`). A class like `p-12` or `top-2.5` is silently not generated, and nothing warns you. After adding classes, search the built CSS (`npm run build`, then `dist/assets/*.css`) for them. A missing `min-w-0`, `inset-0` or `translate-x-0` looks like a layout bug, not a missing class. `npm run build && npm run check:classes` fails on any class used in the code that is not in the built CSS.
- Everything must work by keyboard and at phone width (about 400px) with no horizontal page scroll.

## Naming and code rules (strict, apply to every file)
- **KISS over clever.** Explicit, readable code. No clever one-liners, no nested ternaries, no long `map`/`filter`/`reduce` chains, no deep prop drilling. If it needs a puzzle-solving pause to read, split it into named steps. Full rules and examples: skill `simple-code-conventions`.
- **Simple names everywhere.** Variables, functions, components, hooks, props, types and files use plain English words that say what the thing is or does, so the meaning is clear at a glance. No abbreviations (`event`, not `e`; `button`, not `btn`; `index`, not `i`), no jargon, no vague names (`data`, `item`, `util`, `helper`, `manager`, `handler`). Examples: `SourceChip`, not `SrcChp`; `useAnswerStream`, not `useSSE`; `saveNote`, not `handleNoteSubmit`; `isStreaming`, not `flag`.
- Booleans read as questions (`isOpen`, `hasNotes`, `canStop`); callbacks start with `on` (`onSaveNote`); functions start with a verb.
- **No loose strings or magic numbers.** States, kinds and backend codes are `const` objects with a type made from them (`EvidenceState.removed`, not `'removed'`). Numbers get a name with their unit (`defaultDurationInMilliseconds`). Copy comes from `src/wording`, visual values from tokens. Skill: `simple-code-conventions`, section "Constants".
- **Few comments.** Let names and small functions explain the code. Comment only when the reason is not visible in the code (a quirk, a backend or evidence rule, a trade-off). Skill: `simple-code-conventions`.
- One responsibility per component. No duplicated logic: search before writing.
- Server data comes through `src/api` only. Types mirror the backend (`docs/references/api-contract.md`, skill `api-contract-mirroring`). All fixed copy for answers, abstention and labels comes from `src/wording`.
- Every component ships with a Storybook story. Test files are only for atoms, hooks and plain logic; molecules, organisms and templates have none (use a `play` function in the story when behaviour matters). Pages get neither a story nor a test file. Skills: `storybook-stories`, `component-testing`, `react-typescript-practices`.

## Skills (in `.claude/skills/`)
`simple-code-conventions` (read first, applies to all code), `design-tokens`, `atomic-design-conventions`, `storybook-stories`, `react-typescript-practices`, `tailwind-v4-theming`, `component-testing`, `api-contract-mirroring`, `evidence-ui-integrity`, `reader-and-notes-ux`.

## Agents (in `.claude/agents/`)
Workflow: `frontend-planner` writes a plan to `docs/plans/<feature>.md`; `frontend-implementer` executes it step by step and runs the reviewers at the plan's review gates.
- `frontend-planner`: plans only, never writes app code.
- `frontend-implementer`: implements an approved plan using the skills.
- `design-system-reviewer`: tokens, layer boundaries, duplication, prototype match (read-only).
- `a11y-auditor`: keyboard, labels, contrast, focus, reduced motion (read-only).
- `wording-auditor`: attribution, abstention and system-text labelling (read-only).

## Reference docs
`docs/references/brand.md` (token values), `components.md` (the full component list and status), `api-contract.md` (what the backend sends), `wording.md` (fixed copy).

## Commands (once the project is scaffolded)
`npm run dev`, `npm run storybook`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run check:classes` (after a build), `npm run build-storybook`.
