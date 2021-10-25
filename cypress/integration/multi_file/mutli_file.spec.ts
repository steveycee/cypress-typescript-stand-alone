import "./multi_file.c";

describe("Desktop Navigation Bar Tests", () => {
  beforeEach(() => {
    cy.visit("/todo");
  });

  it("Given I make a valid search I expect relevant results.", () => {
    cy.titleCheck();
  });
});
