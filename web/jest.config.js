// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleDirectories: ['node_modules', './'],
  moduleNameMapper: {
    '@utils': '<rootDir>/components/utils',
    '@components': '<rootDir>/components/src',
  },
}
