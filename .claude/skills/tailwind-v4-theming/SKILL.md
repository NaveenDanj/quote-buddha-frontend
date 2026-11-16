---
name: tailwind-v4-theming
description: How Tailwind v4 is wired to the design tokens, the light, dark and system theme mechanism, utility conventions, and what to avoid. Use when writing styles, configuring Tailwind, adding the theme toggle, or reviewing className usage.
---

# Tailwind v4 theming

Token rules: skill `design-tokens`. Values: `docs/references/brand.md`.

## Setup
- Tailwind v4 is configured in CSS: `@import "tailwindcss";` then an `@theme` block in `src/design-system/tokens/tokens.css` that maps semantic CSS variables to theme keys. There is no `tailwind.config.js` for colors or spacing.
- Disable Tailwind's default palette: only semantic names exist (`bg-page`, `bg-surface-subtle`, `text-text`, `text-text-muted`, `border-border`, `text-accent`). A utility that is not a token must not compile.
- Spacing utilities use the 4px scale (`p-4` = `--space-4`). Radius is one value (`rounded`). Do not add shadow utilities.

## Themes
- Three states: `data-theme="light"`, `data-theme="dark"`, or no attribute (follow `prefers-color-scheme`).
- Define every token on `:root` first. Dark overrides live in `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { ... } }` and again in `:root[data-theme="dark"] { ... }`. Set `color-scheme: dark` in both dark blocks so native controls follow.
- `body` sets an explicit background from `--color-page`.
- The theme toggle sets or removes the `data-theme` attribute and stores the choice with a try/catch around `localStorage`.

## Writing classes
- Use utilities for layout and token-backed styling. Put repeated sets in the component, not in global CSS.
- Use `clsx` for conditional classes. Variants for atoms go in a small typed map (`const sizeClass = { sm: 'h-7', md: 'h-9' }`), not string concatenation.
- Breakpoints are `sm` (760), `md` (900), `lg` (1100). Design phone first, add up.
- Icon buttons, chips and tags are fixed-height controls from tokens; do not hand-size them per use.
- Respect `prefers-reduced-motion`: motion utilities are wrapped in `motion-safe:` or the global rule disables transitions and animations.

## Avoid
- Arbitrary values like `w-[317px]` or `text-[#a8480a]`. Add a token.
- `!important`, except the documented global `[hidden]` rule.
- Inline `style` for anything a token can express. Allowed only for values computed at runtime (graph coordinates, `--reading-scale`).
- Gradients, shadows, emoji.
