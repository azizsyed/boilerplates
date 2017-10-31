module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js}',
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  testRegex: 'tests/.*\\.test\\.js$',
};
