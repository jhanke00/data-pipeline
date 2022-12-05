module.exports = {
  preset: '@shelf/jest-mongodb',
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
