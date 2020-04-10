module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
  },
  setupFilesAfterEnv: ['<rootDir>setupTests.ts'],
  collectCoverage: true,
};
