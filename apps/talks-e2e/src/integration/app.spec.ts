import { getGreeting } from '../support/app.po';

describe('talks', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to talks!');
  });
});
