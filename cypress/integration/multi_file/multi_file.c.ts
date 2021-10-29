declare global {
  namespace Cypress {
    interface Chainable {
      titleCheck(): Chainable<Element>;
      linkUrlCheck(arg1: string, arg2: number): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("titleCheck", () => {
  cy.get("h1").should("have.length.greaterThan", 0);
});

Cypress.Commands.add("linkUrlCheck", (element, linkNumber) => {
  cy.url().then((url) => {
    cy.get(element)
      .find("a")
      .eq(linkNumber)
      .click()
      .url()
      .should("not.equal", url);
  });
});

export {};
