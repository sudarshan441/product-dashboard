describe('🧪 Product Dashboard E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('loads the product list', () => {
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('can search for a product by title', () => {
    cy.get('[placeholder="Search by title..."]').type('shirt');
    cy.wait(600); // wait for debounce
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1).each(($el) => {
    cy.wrap($el)
      .invoke('text')
      .should('match', /shirt/i); 
  }); 
  });

  it('can filter products by category', () => {
    cy.get('select[aria-label="Filter products by category"]').select(1); // skips "all"
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);
  });

  it('can sort products by price ascending', () => {
    cy.get('select[aria-label="Sort products by price"]').select('asc');
    cy.get('[data-testid="product-card"]')
      .then(($cards) => {
        const prices = [...$cards].map(card => 
          parseFloat(card.querySelector('p').innerText.replace('$', ''))
        );
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
  });

  it('can add and remove favorites through detail page', () => {
    // Click first product card
    cy.get('[data-testid="product-card"]').first().click();

    // Add to favorites
    cy.get('[data-testid="favorite-button"]').click();
    cy.get('[data-testid="favorite-button"]').should('contain.text', 'Added to Favorites');

    // Go to Favorites
    cy.contains('Favorites').click();

    // Product should appear
    cy.get('[data-testid="product-card"]').should('have.length.at.least', 1);

    // Remove from favorites
    cy.get('[data-testid="remove-favorite"]').click();

    // Confirm removal
    cy.contains('No favorites added yet.').should('exist');
  });
});
