describe('Home page', () => {
  it('All buttons redirect correctly', () => {
   
    cy.visit('/home');
    
    cy.get('[data-cy="random-clubs"]').should('have.length', 3);

    const actions = ['view', 'update', 'delete'];

    cy.get('[data-cy="table"]').find('[data-cy="random-clubs"]').each((club, index) => {
      actions.forEach((action) => {
        // const clubId = club.find('`[data-cy="${action}`').attr('href').split('/').pop();
        cy.get(`[data-cy="${action}"]:eq(${index})`).click();
        cy.url().should('include', `/club/`);
        cy.go('back');
      });
   
    
});

  cy.get('[data-cy="new-club"]').click();
  cy.url().should('include', '/new-club');
  cy.go('back');

  cy.get('[data-cy="all-clubs"]').click();
  cy.url().should('include', '/all-clubs');
  });
});

