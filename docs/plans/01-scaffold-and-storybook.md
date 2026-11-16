# 01 Scaffold and Storybook

## 1. Goal
Create the runnable project: Vite + React 19 + TypeScript (strict), Tailwind v4, Storybook 9, Vitest + Testing Library + MSW, linting with the layer rules and token checks. No product components yet. Covers build-order step 1 of `00-overall-plan.md`.

## 2. Design
- `package.json` scripts: `dev`, `build`, `typecheck`, `lint`, `test`, `storybook`, `build-storybook`, `check:tokens`.
- Folders created empty with an `index.ts` each: `src/design-system/{tokens,atoms}`, `src/components/{molecules,organisms}`, `src/templates`, `src/pages`, `src/api/{mocks,fixtures}`, `src/wording`, `src/test`.
- Path aliases: `@ds`, `@components`, `@templates`, `@pages`, `@api`, `@wording`, `@test`.
- ESLint (flat config): `no-restricted-imports` zones for the layer direction; `jsx-a11y`; `react-hooks`; `@typescript-eslint` strict. KISS and naming rules from `simple-code-conventions` are enforced where a rule exists: `no-nested-ternary`, `max-depth` 3, `max-lines-per-function` (warn at 60), `complexity` (warn at 8), `id-denylist` for `e`, `evt`, `btn`, `el`, `ctx`, `cb`, `tmp`, `val`, `obj`, `arr`, `res`, `sec`, `src`, `data`, `info`, `item`, and `unicorn/prevent-abbreviations` (with `id`, `url` allowed) if the plugin is added. Zones: `design-system/atoms` may not import from `components`, `templates`, `pages`, `api`, `wording`; `components/molecules` may import only `@ds`; `components/organisms` may import `@ds` and molecules; `templates` may not import `pages` or `api`; only `pages` may import `@api`.
- `scripts/check-tokens.mjs`: fails on hex colors, `rgb(`, raw `px`/`rem`, or numeric `z-index` in `src/**` outside `src/design-system/tokens`.
- Storybook: `@storybook/react-vite`, addons `a11y`, `docs`, `vitest`; a Theme toolbar (system, light, dark) that sets `data-theme`; viewport presets 400 / 900 / 1280; global decorator loads the token CSS and the IBM Plex fonts (self-hosted via `@fontsource`).
- Vitest: jsdom, `@testing-library/jest-dom`, `vitest-axe`, MSW server set up in `src/test/setup.ts`.
- `README.md`: how to run, the layer rules in one paragraph, link to `CLAUDE.md`.

## 3. Reuse
Nothing exists yet. Copy conventions (naming, plan format) from `../quote-buddha/.claude`.

## 4. Steps
1. `npm create vite` (React + TS), then add dependencies: `tailwindcss @tailwindcss/vite`, `react-router`, `@tanstack/react-query`, `lucide-react`, `clsx`, Radix packages (`dialog`, `dropdown-menu`, `popover`, `hover-card`, `tabs`, `select`, `toast`, `checkbox`), `@fontsource/ibm-plex-sans|serif|mono`. Dev: `vitest`, `jsdom`, Testing Library, `user-event`, `msw`, `vitest-axe`, `eslint` plugins, `prettier`. Skills: `react-typescript-practices`, `tailwind-v4-theming`.
2. Configure TypeScript strict and the aliases (`tsconfig`, `vite.config`). Test: `npm run typecheck`.
3. Create the folder skeleton and empty `index.ts` files.
4. ESLint flat config with the layer zones. Test: add a deliberate bad import in a scratch file, confirm lint fails, remove it.
5. `scripts/check-tokens.mjs` plus `npm run check:tokens`. Test: a scratch file with `#fff` fails the check.
6. Tailwind v4 in `src/index.css` with `@import "tailwindcss";` and an empty `@theme` block placeholder (filled in plan 02).
7. Storybook setup with a11y addon, Theme toolbar, viewports, global decorator. Skill: `storybook-stories`.
8. Vitest and MSW setup, one smoke test that renders a trivial component. Skill: `component-testing`.
9. `README.md`. Initial commit only if the user asks.

## 5. Review gates
`design-system-reviewer` after step 6 (config only: layer zones and token check are correct).

## 6. Verification
`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`, `npm run build-storybook`, `npm run storybook` opens with the Theme toolbar working, and the deliberate bad-import and raw-hex checks fail as expected.

## 7. Out of scope
Tokens, components, pages, API client (plans 02 onward).
