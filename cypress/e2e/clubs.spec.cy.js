describe('Home page', () => {
  it('All buttons redirect correctly', () => {
   
    cy.visit('/clubs');
    
    cy.get('[data-cy="random-clubs-home"]').should('have.length', 3);

    const actions = ['view', 'update', 'delete'];

    cy.get('[data-cy="table"]').find('[data-cy="random-clubs-home"]').each((club, index) => {
      actions.forEach((action) => {

        cy.get(`[data-cy="${action}-button"]:eq(${index})`).click();
        cy.url().should('include', `/clubs/`);
        cy.go('back');
      });
   
    
});

  cy.get('[data-cy="create-new-club-button"]').click();
  cy.url().should('include', '/clubs');
  cy.go('back');

  cy.get('[data-cy="view-all-clubs"]').click();
  cy.url().should('include', '/clubs');
  });
});

