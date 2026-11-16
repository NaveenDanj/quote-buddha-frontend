---
name: simple-code-conventions
description: The project's strict readability rules for React and TypeScript - KISS over clever one-liners, and simple plain-English names for variables, functions, components, hooks, props, types and files so the meaning is clear at a glance. Use whenever writing, planning or reviewing any code, stories or tests.
---

# Simple code conventions (KISS)

Same spirit as the backend's `solid-kiss-conventions`. The goal: a new reader understands what the code does in one pass, without a glossary and without decoding tricks.

## Readability
- One job per function and component. If you need "and" to describe it, split it.
- Short functions with names that say what happens. A reader should not need a comment to follow the flow.
- Early returns instead of deep nesting.
- **No clever one-liners.** No nested ternaries, no stacked `map`/`filter`/`reduce` chains, no `&&` chains that decide between several outcomes, no `a ? b : c ? d : e`, no destructuring-with-defaults puzzles, no one-line `reduce` that builds objects. Use a named variable, a small function, or a small component.
- Explicit over implicit: named constants instead of magic numbers or strings; no hidden side effects; no surprising defaults.
- Prefer a plain `for...of` loop or one simple `map` over a long chain. One simple `filter` or `map` on one line is fine when it has no nested condition.
- Comments explain why, not what. If a comment explains what, rename the thing instead.

## Naming (simple English)
Names say what the thing is or does, in plain words anyone can read.

| Kind | Rule | Good | Avoid |
|---|---|---|---|
| Variables | noun that says what it holds | `selectedSection`, `noteText`, `sourceList` | `sel`, `tmp`, `val`, `obj`, `arr`, `data`, `info`, `x` |
| Functions | verb that says what happens | `saveNote`, `openSource`, `stopAnswer`, `findPassage` | `doIt`, `process`, `handle`, `run`, `init` alone |
| Booleans | reads as a yes/no question | `isOpen`, `hasNotes`, `canStop`, `isStreaming` | `flag`, `open`, `status` |
| Props that are callbacks | `on` + what happened | `onSaveNote`, `onCloseDialog` | `cb`, `handler`, `fn` |
| Components | the thing the user sees | `SectionStepper`, `NoteCard`, `AbstainNotice` | `Wrapper`, `Container`, `Item`, `Box`, `Manager` |
| Hooks | `use` + what it gives | `useAnswerStream`, `useSettings` | `useData`, `useLogic`, `useHelper` |
| Types | the thing it describes | `Answer`, `NoteDraft`, `StreamState` | `Props2`, `Obj`, `Info` |
| Files | match the main export | `SectionStepper.tsx`, `useSettings.ts` | `utils.ts`, `helpers.ts`, `misc.ts`, `index2.ts` |

- **No abbreviations**, except widely known ones (`id`, `url`). Write `event`, not `e` or `evt`; `element`, not `el`; `response`, not `res`; `index`, not `i`; `button`, not `btn`; `context`, not `ctx`; `source`, not `src`; `section`, not `sec`.
- Avoid vague words on their own: `util`, `helper`, `manager`, `handler`, `service` (in the frontend), `data`, `info`, `item`, `thing`, `stuff`. Add what it is: `noteList`, not `items`.
- Avoid jargon when a plain word exists: `save`, not `persist` or `upsert`; `load`, not `hydrate` or `ingest`; `remove`, not `dispose`.
- Name by meaning, not by how it works: `sortNotesByPassage` says what happens; `reduceNotesIntoMapThenSort` says how.
- Same word, same meaning everywhere. Pick `passage` or `paragraph` per context and stay with it; pick `note` and never mix with `memo` or `annotation`.
- Keep names short enough to read, long enough to be clear. `sectionNumber` beats both `n` and `currentlySelectedSectionNumberInTheOutline`.
- A name fixed by the backend contract (`citationId`, `workRef`) stays as the contract says, inside `src/api`. Use simple names everywhere else.

## Examples
Bad:
```ts
const ids = notes.filter(n => n.sec === cur && (scope === 'all' || !n.ai)).map(n => n.id)
const label = isStreaming ? hasSteps ? 'Working' : 'Starting' : isStopped ? 'Stopped' : 'Done'
```
Good:
```ts
function isShown(note: Note, section: number, scope: NoteScope): boolean {
  if (scope === 'all') return true
  return note.section === section
}

function findShownNoteIds(notes: Note[], section: number, scope: NoteScope): string[] {
  const shownIds: string[] = []
  for (const note of notes) {
    if (isShown(note, section, scope)) {
      shownIds.push(note.id)
    }
  }
  return shownIds
}

function getStatusText(state: StreamState): string {
  if (state.kind === 'stopped') return 'Stopped'
  if (state.kind === 'done') return 'Done'
  if (state.steps.length === 0) return 'Starting'
  return 'Working'
}
```
Bad JSX:
```tsx
{isOpen ? hasNotes ? <NoteList notes={notes} /> : <Empty /> : null}
```
Good JSX:
```tsx
if (!isOpen) return null
if (!hasNotes) return <EmptyNotes />
return <NoteList notes={notes} />
```

## Design
- One responsibility per component; compose small pieces.
- No duplicated logic: search `src/` for an existing function or component first. If two places need the same thing, extract it once.
- Props are few and clear. If a component needs many booleans, it is probably two components.
- Make impossible states impossible: use a `kind` union (`idle | running | done | stopped | failed`), not several booleans.

## In stories and tests
- Story names say the state: `Streaming`, `Stopped`, `NoTranslator`, not `Story2`.
- Test names say the behaviour: `it('keeps the original when an AI-enhanced note is saved')`.
- Test variables are as plain as app code: `savedNote`, `stopButton`, not `n1`, `btn`.

## Check before done
- [ ] No nested ternaries, no long chains, no cryptic one-liners.
- [ ] Every name is a plain word a new reader understands without help; no abbreviations.
- [ ] Booleans read as questions; callbacks start with `on`; functions start with a verb.
- [ ] No `utils.ts`, `helpers.ts` or vague folder names.
- [ ] Nothing duplicated: reused or extracted.
