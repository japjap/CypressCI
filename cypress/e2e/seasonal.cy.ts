describe('Seasonal Shop Page', () => {
  beforeEach(() => {
    cy.visit('/shop/seasonal');
    cy.get("[data-testid=pie-item]").as("pieItems");
  });

  it("renders the Seasonal section", () => {
    cy.get("h1").contains("Seasonal").should("exist");
  })

  it("renders all Seasonal with name and price", () => {
    cy.get("@pieItems").each(($el) => {
      cy.wrap($el).find("h3").should("exist");
      cy.wrap($el).find("p").contains("$").should("exist");
    });
  })

  it("should add all seasonal pies to cart and review cart", () => {
    cy.get("@pieItems").then(($items) => {
      const itemCount = $items.length;
      cy.wrap($items).each(($item) => {
        cy.wrap($item).contains("button", "Add to Cart").click();
      })

      // Validate cart count
      cy.get("[data-testid=cart-count]").should("have.text", String(itemCount));

      // Review cart page
      cy.reviewCart(itemCount);
    });
  });
});
