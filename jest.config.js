module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  setupFilesAfterEnv: ['<rootDir>setupTests.ts'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/*d.ts',
    '!./src/index.tsx',
    '!./src/App/static-pages/**',
  ],
};
