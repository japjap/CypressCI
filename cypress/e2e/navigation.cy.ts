describe("Navigate to Shop Pages", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("[data-testid=shop-button").as("shopButton");
  });

  it("should navigate to All Pies page, and load pies", () => {
    cy.get("@shopButton").click();
    cy.get("a").contains("All Pies").click();
    cy.url().should("include", "/shop");
    cy.get("h1").contains("All Pies").should("be.visible")
  });

  it("should navigate to Fruit Pies page, and load fruit pies", () => {
    cy.get("@shopButton").click();
    cy.get("a").contains("Fruit Pies").click();
    cy.url().should("include", "/shop/fruit");
    cy.get("h1").contains("Fruit Pies").should("be.visible")
  });

  it("should navigate to Seasonal Pies page, and load seasonal pies", () => {
    cy.get("@shopButton").click();
    cy.get("a").contains("Seasonal Pies").click();
    cy.url().should("include", "/shop/seasonal");
    cy.get("h1").contains("Seasonal Pies").should("be.visible")
  });

  it("should navigate to Cheesecakes page, and load Cheesecakes", () => {
    cy.get("@shopButton").click();
    cy.get("a").contains("Cheesecakes").click();
    cy.url().should("include", "/shop/cheesecake");
    cy.get("h1").contains("Cheesecakes").should("be.visible")
  });
});

describe("Navigate to Other Pages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to contact page", () => {
    cy.visit("/contact");;
    cy.url().should("include", "/contact");
  });

  it("should navigate to register page", () => {
    cy.visit("/register");;
    cy.url().should("include", "/register");
  });

  it("should navigate to cart page", () => {
    cy.visit("/cart");;
    cy.url().should("include", "/cart");
  });

});