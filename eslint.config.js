import path from 'node:path'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJest from 'eslint-plugin-jest'
import eslintPluginJestDom from 'eslint-plugin-jest-dom'
import eslintPluginTestingLibrary from 'eslint-plugin-testing-library'
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'
import eslintParserTypescript from '@typescript-eslint/parser'
import globals from 'globals'
import jsoncParser from 'jsonc-eslint-parser'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/*.config.*', 'build/', 'dist/', 'node_modules/', 'coverage/', 'src/shared/test-utils/*', '.commitlintrc.cjs'],
  },

  // Base config and plugin recommendations
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:jsonc/recommended-with-json',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:react-hooks/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:jsonc/prettier',
      'prettier',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(eslintPluginReact),
      'react-hooks': fixupPluginRules(eslintPluginReactHooks),
      'jsx-a11y': fixupPluginRules(eslintPluginJsxA11y),
      import: fixupPluginRules(eslintPluginImport),
      '@typescript-eslint': fixupPluginRules(eslintPluginTypescript),
    },

    languageOptions: {
      parser: eslintParserTypescript,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.commonjs,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
      'import/resolver': {
        node: true,
        typescript: true,
        alias: {
          map: [['', './public']],
          extensions: ['.js', '.jsx'],
        },
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },

    rules: {
      'object-shorthand': ['error', 'always', { avoidQuotes: true }],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-literals': 'error',
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx', '.ts'] }],
      'no-return-await': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-nested-ternary': 'error',
      '@typescript-eslint/no-empty-interface': 'warn',
      'prefer-promise-reject-errors': 'error',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
        },
      ],
      'react/prop-types': 'off',

      'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'import/no-unused-modules': [
        'error',
        {
          unusedExports: true,
          src: [path.join(import.meta.dirname, 'src')],
        },
      ],
      'import/first': 'error',
      'import/extensions': ['error', 'never'],
      'import/order': [
        'error',
        {
          'newlines-between': 'never',
          warnOnUnassignedImports: true,
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        },
      ],
    },
  },

  // TypeScript disable block for JSON
  ...fixupConfigRules(compat.extends('plugin:@typescript-eslint/disable-type-checked')).map((config) => ({
    ...config,
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
  })),

  {
    files: ['**/*.json', '**/*.json5', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },

  {
    files: ['src/shared/intl/src/messages/*.json'],
    rules: {
      'jsonc/sort-keys': [
        'error',
        {
          pathPattern: '.*',
          order: { type: 'asc' },
        },
      ],
    },
  },

  // Jest and Testing Library
  ...compat.extends('plugin:jest/recommended', 'plugin:jest-dom/recommended', 'plugin:testing-library/react').map((config) => ({
    ...config,
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '**/__mocks__/**/*.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)', '**/jest.config.js'],
  })),

  {
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '**/__mocks__/**/*.[jt]s?(x)', 'src/**/test/**/*.[jt]s?(x)', '**/jest.config.js'],
    plugins: {
      jest: eslintPluginJest,
      'jest-dom': eslintPluginJestDom,
      'testing-library': eslintPluginTestingLibrary,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest,
      },
    },
    rules: {
      'testing-library/no-await-sync-events': [
        'error',
        {
          eventModules: ['fire-event'],
        },
      ],
      'react/jsx-no-literals': 'off',
    },
  },

  // Disable type-checked rules for plain JS
  ...fixupConfigRules(compat.extends('plugin:@typescript-eslint/disable-type-checked')).map((config) => ({
    ...config,
    files: ['./**/*.js'],
  })),

  {
    files: ['./**/*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
