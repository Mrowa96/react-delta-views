module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}', '!<rootDir>/src/*.{ts,tsx}'],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/jest.setupTests.js'],
  transform: {
    '^.+\\.(js)$': '<rootDir>/node_modules/babel-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
