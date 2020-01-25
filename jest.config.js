module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}', '!<rootDir>/src/*.{js,jsx}'],
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setupTests.js'],
};
