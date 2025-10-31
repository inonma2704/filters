/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
export default {
  preset: 'ts-jest/presets/default-esm', // ✅ ESM-compatible
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/src/shared/test-utils/setupTests.ts'],

  clearMocks: true,
  cacheDirectory: '../.jest_cache',

  // ✅ Coverage settings
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text-summary', 'html', 'cobertura'],
  collectCoverageFrom: ['<rootDir>/**/*.{ts,tsx}', '!**/index.{ts,tsx}', '!**/node_modules/**', '!**/dist/**'],
  passWithNoTests: true,

  // ✅ Transform settings
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true, // ✅ Moved here from deprecated `globals`
        tsconfig: './tsconfig.json',
      },
    ],
    '^.+\\.svg$': '<rootDir>/src/shared/test-utils/svgTestTransformer.ts',
  },

  // ✅ Module name mappings (for CSS and path aliases)
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': '<rootDir>/src/shared/test-utils/svgTestTransformer.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // ✅ Extensions and test matching
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testMatch: ['<rootDir>/**/*.spec.tsx', '<rootDir>/**/*.spec.ts'],
  testTimeout: 20000,

  // ✅ Global mock (if you're using it)
  globals: {
    _env_: {
      environment: 'development',
    },
  },
}
