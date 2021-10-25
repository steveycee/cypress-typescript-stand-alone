declare global {
  namespace Cypress {
    interface Chainable {
      titleCheck(): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("titleCheck", () => {
  cy.get("h1").should("have.length.greaterThan", 0);
});

export {};
