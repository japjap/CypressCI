describe('Cheesecake Shop Page', () => {
  beforeEach(() => {
    cy.visit('/shop/cheesecake');
    cy.get("[data-testid=pie-item]").as("pieItems");
  });

  it("renders the Cheesecake section", () => {
    cy.get("h1").contains("Cheesecake").should("exist");
  })

  it("renders all Cheesecake with name and price", () => {
    cy.get("@pieItems").each(($el) => {
      cy.wrap($el).find("h3").should("exist"); // Pie name
      cy.wrap($el).find("p").contains("$").should("exist"); // Price
    });
  })

  it("should add all cheesecakes to cart and validate cart count", () => {
    cy.get("@pieItems").then(($items) => {
      const itemCount = $items.length;
      cy.wrap($items).each(($item) => {
        cy.wrap($item).contains("button", "Add to Cart").click();
      })

      // Validate cart count
      cy.get("[data-testid=cart-count]").should("have.text", String(itemCount));

      // Review cart page
      cy.reviewCart(itemCount);
    })
  });
});