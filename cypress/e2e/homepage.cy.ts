describe("Bethany's Pie Shop Homepage", () => {

  beforeEach(() => {
    cy.visit("/");

    // Define Alias
    cy.get("[data-testid=pie-item]").as("pieItems");
  });

  it("renders the home container", () => {
    cy.get("[data-testid=home-container]").should("exist");
  })

  it("renders the pies section, and shows pies", () => {
    cy.get('@pieItems').should("exist");
    cy.get('@pieItems').should("have.length.greaterThan", 0);
  })

  it("renders the hero carousel with all slides", () => {
    cy.get("[data-testid=hero-carousel]").should("exist");
    cy.get("[data-testid=carousel-slide]").should("have.length", 3);
  });

  it("lists all pies of the month with name and price", () => {
    cy.get('@pieItems').each(($el) => {
      cy.wrap($el).find("h3").should("exist"); // Pie name
      cy.wrap($el).find("p").contains("$").should("exist"); // Price
    });
  });

  it("can add a pie of the month to the cart", () => {
    cy.get('@pieItems').first().within(() => {
      cy.contains("button", "Add to Cart").click();
    });
    cy.get("[data-testid=cart-count]").should("have.length", 1);
  });

  it("Clicking on Show Now on carousal will navigate to /shop page", () => {
    cy.get("[data-testid=carousal-shop-button").first().click();
    cy.url().should("include", "/shop");
  });
});