# 03 Design-system atoms

## 1. Goal
Build the 32 domain-neutral atoms in `src/design-system/atoms/`, each with a story (light and dark) and a test, matching `docs/prototypes/`. Covers build-order step 3 of `00-overall-plan.md`. Component list and responsibilities: `docs/references/components.md`.

## 2. Design
- One folder per atom: `Button/Button.tsx`, `Button.stories.tsx`, `Button.test.tsx`, `index.ts`. Export from `src/design-system/atoms/index.ts`.
- Styling is Tailwind classes over tokens only. Variants are typed props (`variant`, `size`) with a small class map each, joined with `clsx`.
- Atoms never import the domain. Overlays and Select/Tabs wrap Radix primitives; the rest are plain HTML.
- Stories use `Design System/Atoms/<Name>`, `tags: ['autodocs']`, one story per state. The a11y addon must be clean.
- Tests: Testing Library by role, `userEvent`, `vitest-axe` on each atom. Overlays test open, focus trap, Escape and focus return.
- No tooltips. Icon-only controls require `aria-label` (enforced by the prop type).

## 3. Batches (each ends with typecheck, lint, test, build-storybook green)
**A. Basics (no new packages):** `Icon`, `IconButton`, `Button`, `Link`, `Text`, `VisuallyHidden`, `Divider`, `Stamp`.
**B. Small marks (no new packages):** `Chip`, `Tag`, `CountBadge`, `Mark`, `Skeleton`, `LiveDot`, `Meter`.
**C. Form (Radix packages `select`, `checkbox`):** `Input`, `Textarea`, `Select`, `Checkbox`, `DropZone`.
**D. Structure (Radix `tabs`):** `Tabs`, `SegmentedControl`, `Disclosure`, `DataTable`, `FactList`, `Breadcrumbs`, `ListRow`.
**E. Overlays (Radix `dialog`, `dropdown-menu`, `popover`, `hover-card`, `toast`):** `Dialog`, `Menu`, `Popover`, `HoverCard`, `Toast`.

The user installs Radix packages (before batches C, D, E). Nothing else needs installing.

## 4. Decisions to settle on the way
- **Chip border** (batch B): unselected chips use `--color-border` (1.35:1). Move to `--color-text-muted` (6.48:1) so control boundaries meet 3:1. Update `brand.md`.
- **Inverse surfaces** (batch E, Toast): dark focus blue on the inverse background is about 2.0:1. Give inverse surfaces their own focus color or a ring-offset that sits on the page color.
- **High-contrast mode** (batch B, Tag): filled and hatched glyphs need `forced-color-adjust: none` so the three shapes still differ.
- **Icon list**: `Icon` owns the lucide mapping from `brand.md`; the Foundations Icons page then reads it from there instead of its own copy.

## 5. Review gates
`design-system-reviewer` and `a11y-auditor` after batch B and after batch E.

## 6. Verification
`npm run lint`, `typecheck`, `test`, `build-storybook`. In Storybook every atom in light and dark with the a11y addon clean; phone width (400) has no horizontal scroll; keyboard-only pass on batch C to E; side by side with the prototypes the atoms look the same.

## 7. Out of scope
Domain molecules (plan 04), pages, the API client.
