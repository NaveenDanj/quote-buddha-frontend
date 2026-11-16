---
name: react-typescript-practices
description: React 19 and strict TypeScript conventions for this project, including props, state, effects, data fetching, streaming, forms and error handling. Use when writing or reviewing any component, hook or page.
---

# React and TypeScript practices

KISS and plain English first. Readable beats clever. Read `simple-code-conventions` before writing anything: it sets the rules for simple names (no abbreviations, no vague words) and for avoiding clever one-liners, nested ternaries and long chains. Everything below assumes it.

## TypeScript
- `strict: true`, no `any`. Use `unknown` and narrow. Prefer `type` for props and unions, `interface` rarely.
- Model states as discriminated unions, not booleans that can disagree: `type StreamState = { kind: 'idle' } | { kind: 'running'; steps: Step[] } | { kind: 'done'; answer: Answer } | { kind: 'stopped' } | { kind: 'failed'; message: string }`.
- Backend types live in `src/api/types.ts` and mirror the contract (skill `api-contract-mirroring`). Do not redefine them in components.
- Simple plain-English names, no abbreviations: `onSaveNote`, not `onSaveNt`; `event`, not `e`; `index`, not `i`. Booleans read as questions (`isOpen`), functions start with a verb (`saveNote`).

## Components
- Function components, props typed in the same file, small and single-purpose. Compose with children and slots, not boolean prop piles.
- Extend native element props where it helps (`ComponentProps<'button'>`), and forward `ref` and `className` on atoms.
- Controlled by default for inputs that the page cares about; uncontrolled only for throwaway local UI.
- No nested ternaries or chained `&&` for branching. Early return, or a small named component.
- Keep render pure. Derive values during render; use `useMemo` only when profiling says so.

## State and effects
- Local state first. Lift state only as far as needed. URL state (React Router) for what should be linkable: current chat, reader sutta and section.
- Server data uses TanStack Query in `src/api` hooks. Components never call `fetch`.
- Effects are for syncing with the outside world (listeners, timers, SSE). Do not use an effect to compute derived state. Always clean up.
- Settings that persist (text size, theme, Pali spelling, citation style) go through one `useSettings` hook backed by `localStorage` with try/catch; the app must work when storage throws.

## Streaming answers
- `useAnswerStream` owns the SSE or fetch-stream connection, exposes the discriminated `StreamState`, and supports `stop()`. Cancel with `AbortController`; clean up on unmount.
- Show each step as it arrives (searching, retrieved, drafting, verifying). On stop, show "Stopped", keep what arrived, save nothing.

## Overlays and focus
- Use the design-system `Dialog`, `Menu`, `Popover`, `HoverCard` and `Toast`. Do not hand-roll focus traps. Return focus to the opener on close.

## Errors
- One error boundary per page. Network errors show a calm inline message with a retry icon button, never a raw stack or status code.
- Missing data is stated (see `evidence-ui-integrity`), not hidden.

## Imports
Absolute aliases (`@ds`, `@components`, `@templates`, `@pages`, `@api`, `@wording`). Respect the layer direction in `atomic-design-conventions`.
