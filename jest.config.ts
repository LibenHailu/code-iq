import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  verbose: true,
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
};

export default createJestConfig(config);
