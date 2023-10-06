# Newsletter tests

### Before you start:
1. Install all project dependecies with `yarn install` command.
2. Signup in mailslurp -> `https://www.mailslurp.com/` 
3. Enter Your API Key in `cypress.config.js` to variable `MAILSLURP_API_KEY`


### Running tests
1. Run tests with `yarn test` to run headless and to generate a reports in `report` folder run `yarn cy:generate:report` command
2. Run tests with `yarn test:ui` to open Cypress UI

### Bugs found when testing
1. When user enters a start date by hand there is always today's date being sent in the request
2. Entering today's date by hand causes validation to fail with message "startDate" must be greater than "2022-07-07T00:00:00.000Z"


