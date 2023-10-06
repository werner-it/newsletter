Cypress.Commands.add('fillRequired', (email, firstName, lastName, newsletter, startDate) => {
  cy.get('#newsletter_email')
    .type(email);
  cy.get('#newsletter_email')
    .should('have.value', email);
  cy.get('#newsletter_name')
    .type(firstName);
  cy.get('#newsletter_surname')
    .type(lastName);
  cy.get('#newsletter_newsType')
    .click();
  cy.contains(newsletter)
    .click();
  cy.get('#newsletter_startDate')
    .click();
  cy.get('.ant-calendar-today-btn')
    .click();
  cy.get('#newsletter_startDate input')
    .should('have.value', startDate);
  cy.get('#newsletter_agreement')
    .click();
});

Cypress.Commands.add('fillRequiredNegative', (email, firstName, lastName, newsletter, startDate) => {
  cy.get('#newsletter_email')
    .type(email);
  cy.get('#newsletter_email')
    .should('have.value', email);
  cy.get('#newsletter_name')
    .type(firstName);
  cy.get('#newsletter_surname')
    .type(lastName);
  cy.get('#newsletter_newsType')
    .click();
  cy.contains(newsletter)
    .click();
  cy.get('#newsletter_startDate')
    .type(`${startDate}{enter}`);
  cy.get('#newsletter_agreement')
    .click();
});

Cypress.Commands.add('getLatestEmail', (inboxId) => {
  let emailBody;
  cy.request({
    failOnStatusCode: false,
    headers: {
      'x-api-key': `${Cypress.env('MAILSLURP_API_KEY')}`,
    },
    method: 'GET',

    url: `${Cypress.env('mailslurpUrl')}waitForLatestEmail?inboxId=${inboxId}&unreadOnly=false`,
  })
    .then((res) => {
      expect(res.status).eql(200);
      emailBody = res.body.body;

      return emailBody;
    });
});

Cypress.Commands.add('emptyInbox', (inboxId) => {
  cy.request({
    failOnStatusCode: false,
    headers: {
      'x-api-key': `${Cypress.env('MAILSLURP_API_KEY')}`,
    },
    method: 'DELETE',

    url: `${Cypress.env('mailslurpUrl')}emptyInbox?inboxId=${inboxId}`,
  })
    .then((res) => {
      expect(res.status).eql(204);
    });
});
