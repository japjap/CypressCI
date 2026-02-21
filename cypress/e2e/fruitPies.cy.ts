describe('Fruit Pies Shop Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/pies?category=fruit').as('getFruitPies');
    cy.visit('/shop/fruit');
    cy.wait('@getFruitPies').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(interception.response.body).to.have.length.greaterThan(0);
    });
    cy.get("[data-testid=pie-item]").as("pieItems");

  });

  it("renders the fruit pies section", () => {
    cy.get("h1").contains("Fruit Pies").should("exist");
  })

  it("renders all fruit pies with name and price", () => {
    cy.get("@pieItems").each(($el) => {
      cy.wrap($el).find("h3").should("exist"); // Pie name
      cy.wrap($el).find("p").contains("$").should("exist"); // Price
    });
  })

  it("should add all fruit pies to cart and validate cart count", () => {
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