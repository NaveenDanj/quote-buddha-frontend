---
name: component-testing
description: How to test components, hooks and pages in this project with Vitest, Testing Library and MSW; what to assert; and what not to mock. Use when writing or running tests.
---

# Component testing

Stack: Vitest, `@testing-library/react`, `@testing-library/user-event`, `jest-dom` matchers, MSW for the network, `vitest-axe` for accessibility smoke checks.

## Layout
Tests sit next to the component: `Button.test.tsx`. Page tests live in `src/pages/<page>/`. Shared helpers in `src/test/` (`renderWithProviders`, MSW server, fixtures).

## What to test
- **Behaviour a user can see**, found by role, label or text, not by class names or test ids. If you cannot find it by role, it may not be accessible.
- Atoms: renders each variant and state, passes props through, keyboard activation, `aria-pressed`/`aria-expanded` changes, disabled behaviour.
- Overlays: opens from the trigger, traps focus, closes on Escape, returns focus to the opener.
- Evidence components: each evidence state shows its glyph **and** its text (never color alone), and system-written text shows its label.
- Composer: Enter sends, Shift+Enter adds a line, `/` opens the slash menu, Stop replaces Ask while streaming.
- Reader: section stepping, view toggle, selection toolbar, add note, AI-enhance accept and discard, and that enhanced notes keep "Your original".
- Streaming: steps appear one by one, stop keeps what arrived and saves nothing.
- Pages: load with MSW fixtures for answered, abstained, streaming, stopped, error.
- Settings: text size, theme and Pali spelling apply and survive a reload; the app still works when `localStorage` throws.

## Rules
- Use `userEvent`, not `fireEvent`. Await async UI with `findBy*`, not timers.
- Mock the network with MSW at the boundary. Do not mock `fetch`, TanStack Query or your own hooks. Do not mock components you own.
- Fixtures are built from the backend `Answer` model (`src/api/fixtures`), and sample text is marked as sample.
- Add an axe check to each organism and dialog test: `expect(await axe(container)).toHaveNoViolations()`.
- No snapshot tests for markup. Visual regression, if added later, is Storybook-based.
- Keep tests small and named for the behaviour: `it('keeps the original when an AI-enhanced note is saved')`.
- Tests follow `simple-code-conventions` too: plain variable names (`savedNote`, `stopButton`, not `n1`, `btn`), no clever one-line setups, one thing asserted per test where practical.

## Constants in tests
Compare against the domain constants (`EvidenceState.removed`, `EvidenceShape.dashed`), not retyped strings, so a renamed value breaks the test at compile time. Sample text may stay a plain string.

## Commands
`npm run test` (watch off in CI), `npx vitest run src/path`, `npm run test -- --coverage`.
