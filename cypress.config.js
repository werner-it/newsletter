/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // baseUrl: '', - removed of security reasons
    video: false,
    reporter: 'mochawesome',
    reporterOptions: {
      charts: true,
      overwrite: false,
      html: false,
      json: true,
      reportDir: 'cypress/report/mochawesome-report',
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    requestTimeout: 30000,
    responseTimeout: 30000,
    defaultCommandTimeout: 30000,
  },
  env: {
    MAILSLURP_API_KEY: 'your-api-key',
    mailslurpUrl: 'https://api.mailslurp.com/',
    requestTimeout: 30000,
  },
});
