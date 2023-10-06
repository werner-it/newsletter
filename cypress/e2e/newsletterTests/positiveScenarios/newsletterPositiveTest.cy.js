// <reference types="cypress-mailslurp" />
const faker = require('faker');
const dayjs = require('dayjs');

const lastName = faker.name.lastName();
const firstName = faker.name.firstName();
const startDate = dayjs().format('YYYY-MM-DD');
const startDateEmail = dayjs().format('DD/MM/YYYY');
const endDate = dayjs().add(32, 'day').format('YYYY-MM-DD');
const endDateEmail = dayjs().add(31, 'day').format('DD/MM/YYYY');
const newsletterTypes = ['Industry', 'IT', 'Medical'];
let email;
let inboxId;

describe('Feature: Newsletter signup - Positive tests', () => {
  before('create an email address and inbox', () => cy.mailslurp()
    .then((mailslurp) => mailslurp.createInbox())
    .then((inbox) => {
      inboxId = inbox.id;
      email = inbox.emailAddress;
    }));

  newsletterTypes.forEach((newsletterType) => {
    it(`As a user I want to be able to fill all fields, select newsletter ${newsletterType}, submit a form and recieve confirmation email`, () => {
      cy.visit('/');
      cy.emptyInbox(inboxId);
      cy.fillRequired(email, firstName, lastName, newsletterType, startDate);
      cy.get('#newsletter_endDate')
        .type(`${endDate}{enter}`);
      cy.get('#newsletter_endDate input')
        .should('have.value', endDate);
      cy.get('#newsletter_Sex')
        .contains('Male')
        .click();
      cy.get('.ant-btn')
        .click();
      cy.get('.ant-modal-content')
        .should('be.visible')
        .should('contain', 'Successfully added to newsletter');
      cy.getLatestEmail(inboxId)
        .should('contain', firstName)
        .and('contain', lastName)
        .and('contain', startDateEmail)
        .and('contain', endDateEmail)
        .and('contain', newsletterType.toLowerCase());
      cy.emptyInbox(inboxId);
    });
  });

  newsletterTypes.forEach((newsletterType) => {
    it(`As a user I want to be able to fill required fields, select newsletter ${newsletterType}, submit a form and recieve confirmation email`, () => {
      cy.visit('/');
      cy.fillRequired(email, firstName, lastName, newsletterType, startDate);
      cy.get('.ant-btn')
        .click();
      cy.get('.ant-modal-content')
        .should('be.visible')
        .should('contain', 'Successfully added to newsletter');
      cy.getLatestEmail(inboxId)
        .should('contain', firstName)
        .and('contain', lastName)
        .and('contain', startDateEmail)
        .and('contain', newsletterType.toLowerCase());
      cy.emptyInbox(inboxId);
    });
  });
});
