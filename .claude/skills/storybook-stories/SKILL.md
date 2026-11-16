---
name: storybook-stories
description: How to write Storybook 9 stories for this project (CSF3, controls, states, themes, a11y checks, play functions, MSW). Use when adding or changing any component or page, or setting up Storybook.
---

# Storybook stories

Every component ships with a story file next to it: `Component.stories.tsx`.

## Format
- CSF3 with `satisfies Meta<typeof Component>`. A `Default` story plus one story per state.
- `title` follows the layer: `Design System/Atoms/Button`, `Components/Molecules/...`, `Components/Organisms/...`, `Templates/...`, `Pages/...`.
- Use `args` and `argTypes` so controls work; do not hard-code props inside render functions.
- Story names say the state in plain words (`Streaming`, `Stopped`, `NoTranslator`, `LongText`), never `Story2` or `Test`. Keep story code simple and explicit (`simple-code-conventions`).
- Add `tags: ['autodocs']` on atoms and molecules.

## States to cover
Default, hover and focus where the look changes, pressed and selected, disabled, loading or streaming, empty, error, long text (wrap, no overflow), and for evidence components every evidence state: direct quote, not verified, not used, removed, not established. For interactive components add a `play` function that proves the key interaction with Testing Library.

## Themes and sizes
- The toolbar offers Theme (system, light, dark) by setting `data-theme` on the root. Check every story in both light and dark.
- Viewport presets: phone (400), tablet (900), desktop (1280). Check phone width for anything that appears in the chat or Reader.
- Reading text size (`--reading-scale`) should be testable with a toolbar control.

## Accessibility
The a11y addon must show no violations. If a rule is waived, add a comment explaining why in the story, and mention it in the review.

## Data
Page and organism stories use MSW handlers from `src/api/mocks` and fixtures built from the backend `Answer` model. Fixtures cover answered, abstained, streaming, stopped and error. Sample text is labelled sample (see `evidence-ui-integrity`); never pair a real quotation with a made-up citation.

## Docs pages
Foundations docs (colors, type, spacing, radius, z-index, layout, motion, icons) are MDX pages that read the CSS variables, so they cannot drift from the tokens.

## Checklist before done
- [ ] Story for each state, light and dark.
- [ ] Controls work. Keyboard operable.
- [ ] a11y addon clean. No horizontal overflow at phone width.
- [ ] Looks the same as the matching part of `docs/prototypes/workspace.html`.
- [ ] `npm run build-storybook` passes.
