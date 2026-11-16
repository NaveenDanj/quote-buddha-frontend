---
name: atomic-design-conventions
description: Atomic design layers for this project, what goes where, the one-way import rule, folder and file naming, and Storybook title conventions. Use when creating or moving any component, template or page, or deciding which layer something belongs to.
---

# Atomic design conventions

Component inventory and status: `docs/references/components.md`.

## Layers and folders
| Layer | Folder | May import | Knows about the domain? |
|---|---|---|---|
| Tokens | `src/design-system/tokens/` | nothing | no |
| Atoms (design system) | `src/design-system/atoms/` | tokens | **No.** Domain-neutral only |
| Molecules | `src/components/molecules/` | atoms | yes (passages, claims, citations, notes) |
| Organisms | `src/components/organisms/` | molecules, atoms, smaller organisms | yes |
| Templates | `src/templates/` | organisms, molecules, atoms | no data, layout only |
| Pages | `src/pages/` | templates | yes; the only place that fetches |

## Decide the layer
- Would it make sense in a different product (a Button, Dialog, Tabs, DataTable)? It is an **atom**, even if it is built from Radix.
- Does it know what a passage, claim, citation, evidence state, term or note is? It is **not** an atom. `EvidenceTag` wraps the neutral `Tag`; `CiteLink` wraps `Link`.
- Does it combine a few atoms for one small domain job? **Molecule.**
- Is it a self-contained section a user recognises (the composer, the research panel, the Reader toolbar)? **Organism.**
- Does it only arrange regions (rail + top bar + main)? **Template.**

## Rules
- Imports go one way. ESLint `no-restricted-imports` enforces it. Never import a page from an organism, or an organism from an atom.
- Organisms receive data and callbacks through props. They do not call `fetch` or query hooks. Pages (or page-level hooks in `src/pages/<page>/`) call `src/api` and pass data down.
- One component per folder: `Button/Button.tsx`, `Button.stories.tsx`, `index.ts`, and `Button.test.tsx` for atoms only (molecules, organisms, templates and pages have no test file). Export from the layer's `index.ts`.
- Variants are props (`variant`, `size`), not copies. Before adding a variant, check the prototype actually uses it.
- Boxes that hold a group use `Surface` (look, padding, gap). Do not write a new styled `div` for a gray panel, a dashed notice or a framed card.
- Compose before you create. Search `src/` for something that already does the job.
- Simple plain-English names, no abbreviations, no vague words like `Wrapper`, `Container`, `Item`, `Manager`: `SectionStepper`, `VersionSwitcher`, `StreamingSteps`. Rules and examples: `simple-code-conventions`.

## Storybook titles
`Design System/Atoms/Button`, `Components/Molecules/EvidenceTag`, `Components/Organisms/Composer`, `Templates/ChatLayout`, `Pages/Conversation`. Foundations docs: `Design System/Foundations/Colors` and so on.

## Moving a component
If a design-system atom turns out to need domain knowledge, move it to `components/molecules/` and make a neutral atom beneath it. Record the move in `docs/references/components.md`.
