import js from '@eslint/js'
import {
  defineConfig,
  globalIgnores
} from 'eslint/config'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const layerRules = [{
    files: ['src/design-system/**/*.{ts,tsx}'],
    forbidden: [
      '@components/*',
      '@templates/*',
      '@pages/*',
      '@api/*',
      '@wording/*',
      '@domain/*',
      'react-router*',
      '@tanstack/*',
      'msw*',
    ],
    allowTypeImports: false,
    reason: 'Design-system atoms may import tokens only. If it knows about passages or claims, move it to components/.',
  },
  {
    files: ['src/components/molecules/**/*.{ts,tsx}'],
    forbidden: ['@components/organisms/*', '@templates/*', '@pages/*', '@api/*'],
    allowTypeImports: false,
    reason: 'Molecules may import atoms only. Types come from @domain, data from pages.',
  },
  {
    files: ['src/components/organisms/**/*.{ts,tsx}'],
    forbidden: ['@templates/*', '@pages/*', '@api/*'],
    allowTypeImports: false,
    reason: 'Organisms may import molecules and atoms only. Types come from @domain, data from pages.',
  },
  {
    files: ['src/templates/**/*.{ts,tsx}'],
    forbidden: ['@pages/*', '@api/*', '**/api/**'],
    allowTypeImports: false,
    reason: 'Templates may import organisms, molecules, and atoms only. Types come from @domain.',
  },
]

const noParentImports = {
  group: ['../*', '../**'],
  message: 'Use an alias (@ds/..., @components/..., @api/...) instead of a ../ import.',
}

function makeLayerConfig(rule) {
  return {
    files: rule.files,
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            noParentImports,
            {
              group: rule.forbidden,
              message: rule.reason,
              allowTypeImports: rule.allowTypeImports,
            },
          ],
        },
      ],
    },
  }
}

const crypticNames = [
  'e',
  'evt',
  'btn',
  'el',
  'ctx',
  'cb',
  'tmp',
  'val',
  'obj',
  'arr',
  'res',
  'sec',
  'i',
  'j',
]

export default defineConfig([
  globalIgnores(['dist', 'storybook-static', 'coverage', 'node_modules', 'docs']),
  js.configs.recommended,
  tseslint.configs.strict,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-nested-ternary': 'error',
      'max-depth': ['error', 3],
      complexity: ['warn', 8],
      'max-lines-per-function': [
        'warn',
        {
          max: 60,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      'id-denylist': ['error', ...crypticNames],
      // A scrollable region (a wide table) must be focusable so keyboard users can scroll it.
      'jsx-a11y/no-noninteractive-tabindex': ['error', {
        roles: ['tabpanel', 'region']
      }],
    },
  },
  {
    // A test file is one long describe block on purpose: each test inside it stays short.
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'max-lines-per-function': 'off'
    },
  },
  {
    files: ['*.config.{js,ts}', 'scripts/**/*.mjs', '.storybook/**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-restricted-imports': ['error', {
        patterns: [noParentImports]
      }],
    },
  },
  ...layerRules.map(makeLayerConfig),
])