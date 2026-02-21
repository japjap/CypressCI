describe("Test Contact Form", () => {
  beforeEach(() => {
    cy.visit("/contact");
    cy.get('input[name="name"]').as("nameInput");
    cy.get('input[name="email"]').as("emailInput");
    cy.get('textarea[name="message"]').as("messageInput");
    cy.get('button[type="submit"]').as("submitButton");
  });

  it("Should submit the contact form successfully", () => {
    cy.get('@nameInput').type("John Doe");
    cy.get('@emailInput').type("abc@outlook.com");
    cy.get('@messageInput').type("This is a test message.");
    cy.get('@submitButton').click();
    cy.get("h1").should("be.visible").and("contain", "Thank you for contacting us!");
  });

  it("should show validation errors for empty fields", () => {
    cy.get('@submitButton').click();
    cy.get('@nameInput').should("have.class", "focus:ring-[rgba(200,125,82,0.5)]")
  });

  it("should show validation errors for empty email field", () => {
    cy.get('@nameInput').type("John Doe");
    cy.get('@submitButton').click();
    cy.get('@emailInput').should("have.class", "focus:ring-[rgba(200,125,82,0.5)]")
  });

  it("should show validation errors for empty message field", () => {
    cy.get('@nameInput').type("John Doe");
    cy.get('@emailInput').type("abc@outlook.com");
    cy.get('@submitButton').click();
    cy.get('@messageInput').should("have.class", "focus:ring-[rgba(200,125,82,0.5)]")
  });

  it("should show validation error for wrong email address", () => {
    cy.get('@nameInput').type("John Doe");
    cy.get('@emailInput').type("abc");
    cy.get('@messageInput').type("This is a test message.");
    cy.get('@submitButton').click();
    cy.get('@emailInput').should("have.class", "focus:ring-[rgba(200,125,82,0.5)]")
  });

});