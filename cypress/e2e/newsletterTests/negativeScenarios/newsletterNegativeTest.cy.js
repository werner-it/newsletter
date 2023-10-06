// <reference types="cypress-mailslurp" />
const faker = require('faker');
const dayjs = require('dayjs');

const lastName = faker.name.lastName();
const firstName = faker.name.firstName();
const email = 'michal@test.com';
const wrongEmail = 'michal@test';
const newsletterType = 'IT';
const today = dayjs().format('YYYY-MM-DD');
const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
const endDate = dayjs().add(31, 'day').format('YYYY-MM-DD');
const requiredFields = ['E-mail', 'First name', 'Surname', 'newsletter type', 'Start date'];

describe('Feature: Newsletter signup - Negative tests', () => {
  it('User shouldn\'t be able to sumbit empty form', () => {
    cy.visit('/');
    cy.get('.ant-btn')
      .click();
    requiredFields.forEach((requiredField) => {
      cy.get('.ant-form-explain')
        .contains(`The "${requiredField}" field is required!`)
        .should('be.visible');
    });
    cy.contains('Accepting terms and condition is required!')
      .should('be.visible');
  });

  it('User shouldn\'t be able to submit form with endDate before startDate', () => {
    cy.visit('/');
    cy.intercept('POST', '/prod/')
      .as('submitRequest');
    cy.fillRequiredNegative(email, firstName, lastName, newsletterType, endDate);
    cy.get('#newsletter_endDate')
      .type(`${today}{enter}`);
    cy.get('#newsletter_startDate input')
      .should('have.value', endDate);
    cy.get('#newsletter_endDate input')
      .should('have.value', today);
    cy.get('.ant-btn')
      .click();
    cy.wait('@submitRequest');
    cy.get('@submitRequest')
      .its('response.statusCode')
      .should('eq', 400);
  });

  it('User shouldn\'t be able to submit form with endDate 30 days before startDate', () => {
    cy.visit('/');
    cy.intercept('POST', '/prod/')
      .as('submitRequest');
    cy.fillRequiredNegative(email, firstName, lastName, newsletterType, today);
    cy.get('#newsletter_endDate')
      .type(`${tomorrow}{enter}`);
    cy.get('#newsletter_startDate input')
      .should('have.value', today);
    cy.get('#newsletter_endDate input')
      .should('have.value', tomorrow);
    cy.get('.ant-btn')
      .click();
    cy.wait('@submitRequest');
    cy.get('@submitRequest')
      .its('response.statusCode')
      .should('eq', 400);
  });

  it('User shouldn\'t be able to submit form with wrong email address', () => {
    cy.visit('/');
    cy.fillRequiredNegative(wrongEmail, firstName, lastName, newsletterType, today);
    cy.get('.ant-btn')
      .click();
    cy.get('.ant-form-explain')
      .should('have.text', 'The "E-mail" field is required!');
  });

  it('Date should be fixed to current if user enters past date', () => {
    cy.visit('/');
    cy.fillRequiredNegative(email, firstName, lastName, newsletterType, yesterday);
    cy.get('#newsletter_startDate input')
      .should('have.value', today);
  });
});
