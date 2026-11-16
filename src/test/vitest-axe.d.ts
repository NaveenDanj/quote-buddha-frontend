import 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'

// This adds the `toHaveNoViolations` matcher to Vitest's types.
// The generic and the empty interfaces must match Vitest's own declarations, so the lint rules
// that dislike them are switched off for this one file.
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type */
declare module 'vitest' {
  interface Assertion<T = unknown> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
