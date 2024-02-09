import clubs from "../fixtures/clubs.json";

describe('Home page', () => {
  it('All buttons redirect correctly', () => {

    cy.visit('/clubs');

    cy.get('[data-cy="random-clubs-home"]').should('have.length', 3);
    cy.get('[data-cy="table-title-action"]').should('contain', 'Action')
    cy.get('[data-cy="table-title-teams"]').should('contain', 'Teams')

    const actions = ['view', 'update', 'delete'];

    cy.get('[data-cy="table-random-clubs-home"]').find('[data-cy="random-clubs-home"]').each((club, index) => {
      actions.forEach((action) => {

        cy.get(`[data-cy="${action}-club-href-home"]:eq(${index})`).click();
        cy.intercept("GET", `/clubs/${club.id}`, {
          statusCode: 200,
          body: {
            id_UUID: clubs.id_UUID,
            id: clubs.id,
            club_name: clubs.club_name,
            club_adress: clubs.club_adress,
            club_foundation_year: clubs.club_foundation_year,
            image_path: clubs.image_path
          }
        })
        cy.go("back");
      });
    });
  });
});

