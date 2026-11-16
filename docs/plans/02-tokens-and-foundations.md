# 02 Tokens and Foundations

## 1. Goal
Implement every design token from `docs/references/brand.md` as CSS variables mapped to Tailwind v4, with light, dark and system themes, and a Foundations docs section in Storybook that renders from the live variables. Reproduces `docs/prototypes/design-system.html` (Color, Type, Space and shape). Covers build-order step 2.

## 2. Design
- `src/design-system/tokens/primitives.css`: raw palette values only.
- `src/design-system/tokens/tokens.css`: semantic tokens on `:root`, dark overrides in `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {...} }` and `:root[data-theme="dark"] {...}` with `color-scheme: dark`, plus the `@theme` mapping and the global rules: `body` background, `[hidden]`, focus ring, `prefers-reduced-motion`.
- Token groups: color, typography roles and `--reading-scale`, space `--space-1..8`, radius, z-index scale, layout sizes, breakpoints, motion, icon sizes, `--pattern-hatch`.
- `src/design-system/tokens/theme.ts`: `useTheme` hook (system / light / dark) that sets or removes `data-theme`, stores the choice in `localStorage` inside try/catch, and works when storage throws.
- Storybook MDX pages under `Design System/Foundations`: Colors (swatch plus computed contrast ratio against page and subtle), Typography (all roles incl. a Pali line with diacritics), Space, Radius and borders, Z-index and layout, Motion, Icons (the mapped lucide set), Evidence glyphs.
- Foundations pages read values with `getComputedStyle` so they cannot drift.

## 3. Reuse
Values from `docs/references/brand.md`; the CSS in `docs/prototypes/design-system.html` as the visual check.

## 4. Steps
1. `primitives.css` and the light semantic tokens. Skill: `design-tokens`.
2. Dark overrides in both blocks. Skill: `tailwind-v4-theming`. Test: toggling `data-theme` flips every token; with no attribute it follows the system.
3. Typography roles and font loading (`@fontsource`), `--reading-scale` with the four settings.
4. Space, radius, z-index, layout, breakpoints, motion, icon sizes, `--pattern-hatch`.
5. `@theme` mapping with Tailwind's default palette disabled. Test: an unknown color utility does not compile; `bg-page` does.
6. Global rules (body, hidden, focus ring, reduced motion).
7. `useTheme` with tests (storage works, storage throws, system default).
8. Foundations MDX pages with computed contrast. Skill: `storybook-stories`.
9. Resolve the open item from `brand.md`: unselected chip border contrast. Decide with the user and update `brand.md`.

## 5. Review gates
`design-system-reviewer` after step 6 (tokens, naming, no raw values). `a11y-auditor` after step 8 (contrast shown in Storybook matches `brand.md`).

## 6. Verification
`npm run lint`, `check:tokens`, `typecheck`, `test`, `build-storybook`. In Storybook: every token page renders in light, dark and system; contrast numbers match `brand.md`; a Pali line shows `ṃ ñ ṇ ṭ ā ī ū` correctly; side by side with `docs/prototypes/design-system.html` the colors, type and spacing match.

## 7. Out of scope
Components (plan 03 onward), Sinhala fonts (stack fallbacks only), a theme toggle UI beyond the hook.
