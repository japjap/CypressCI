/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to review the cart and validate item count
     * @example cy.reviewCart(3)
     */
    reviewCart(itemCount: number): Chainable<Subject>;
  }
}

Cypress.Commands.add("reviewCart", (itemCount: number) => {
  // Review cart page
  cy.get("a").contains("Cart").click();
  cy.url().should("include", "/cart");
  cy.get("[data-testid=cart-items]").should("have.length", itemCount);
  cy.get("[data-testid=cart-items]").each(($item) => {
    cy.wrap($item).find("h3").should("exist"); // Pie name
    cy.wrap($item).find("p").contains("$").should("exist"); // Price
  });
});