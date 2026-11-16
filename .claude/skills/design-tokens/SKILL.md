---
name: design-tokens
description: How design tokens are structured, named and used in this project (primitive to semantic to Tailwind theme), the full token groups, and how to add or change one. Use when touching src/design-system/tokens, adding any color, size, spacing, z-index or layout value, or reviewing styling.
---

# Design tokens

Values and the full list: `docs/references/brand.md`. Visual reference: `docs/prototypes/design-system.html`.

## Three tiers
1. **Primitive** (raw values, only inside `src/design-system/tokens/primitives.css`): `--palette-ink-900`, `--palette-paper-0`, and so on.
2. **Semantic** (what components use): `--color-text`, `--color-text-muted`, `--color-page`, `--color-surface-subtle`, `--color-border`, `--color-accent`, `--color-danger`, `--color-focus`, `--color-scrim`, `--color-inverse-bg`, `--color-inverse-text`. The dark theme redefines semantic tokens only.
3. **Tailwind theme** (`@theme` in `tokens.css`): maps semantic tokens to utilities (`text-text-muted`, `border-border`, `gap-4`). Components never reference primitives.

## Token groups
Color · Typography (`--font-reading`, `--font-ui`, `--font-code`; roles display, h1–h3, reading, ui, caption, code, pali) · Space (`--space-1` to `--space-8`, 4px base) · Radius (`--radius` = 2px) · Z-index (`--z-rail: 20`, `--z-topbar: 30`, `--z-panel: 50`, `--z-dialog: 70`, `--z-menu: 80`, `--z-toast: 90`) · Layout (`--layout-rail`, `--layout-topbar`, `--layout-panel`, `--layout-reader-outline`, `--measure-reading`, `--measure-wide`) · Breakpoints (`sm` 760, `md` 900, `lg` 1100) · Motion (`--motion-fast`, `--motion-base`) · Evidence patterns (`--pattern-hatch`) · Icon size (`--icon-sm` 16, `--icon-md` 18, `--icon-lg` 20) · `--reading-scale` (user text-size setting).

## Rules
- No hex, `rgb()`, raw `px`/`rem` or numeric `z-index` outside `src/design-system/tokens`. A grep check enforces this.
- Add a token before using a new value. Record it in `docs/references/brand.md` with its light and dark values and its contrast pairing.
- Name tokens by purpose (`--color-text-muted`), not by look (`--color-gray-5`).
- Every text/background pair must meet WCAG AA in light and dark. Check the accent as text (12px footnote markers) and muted text on `--color-surface-subtle`.
- No shadows and no gradients. Separation comes from hairlines and space. Radius is 2px everywhere.
- Evidence state is a glyph pattern (filled, hatched, dashed) plus text, never color alone.
- Theme switching works on three states: `data-theme="light"`, `data-theme="dark"`, and none (follow the system). Define every token on `:root` first, then redefine in `@media (prefers-color-scheme: dark)` (guarded with `:root:not([data-theme="light"])`) and under `:root[data-theme="dark"]`.

## Adding or changing a token
1. Add the primitive (if new) and the semantic token with light and dark values.
2. Map it in `@theme` if it needs a utility.
3. Add it to the Foundations docs page in Storybook (it renders from the CSS variables, so it cannot drift).
4. Update `docs/references/brand.md`.
5. Run `npm run lint` (token grep) and the a11y check in Storybook.
