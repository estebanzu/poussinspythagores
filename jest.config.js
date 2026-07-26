module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js', 'server.js'],
};
