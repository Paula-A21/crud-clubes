import clubs from "../fixtures/clubs.json";

describe("Home page", () => {
  it("All buttons must be correct ", () => {
    cy.visit("/clubs");

    cy.get('[data-cy="random-clubs-home"]').should("have.length", 3);
    cy.get('[data-cy="table-title-action"]').should("contain", "Action");
    cy.get('[data-cy="table-title-teams"]').should("contain", "Teams");
    cy.get('[data-cy="view-club-href-home"]').should("have.length", 3);
    cy.get('[data-cy="update-club-href-home"]').should("have.length", 3);
    cy.get('[data-cy="delete-club-href-home"]').should("have.length", 3);
    cy.get('[data-cy="view-all-clubs-button-home"]').click();
    
    cy.intercept("GET", "/clubs", {
      statusCode: 200,
      query: {
        action: "all-clubs",
      },
    });
    
  });
});

describe("Club detail", () => {
  it("Must return club detail information correctly", () => {
    cy.visit("/clubs");

    cy.get('[data-cy="table-random-clubs-home"]')
      .find('[data-cy="random-clubs-home"]')
      .each((club, index) => {
        cy.get(`[data-cy="view-club-href-home"]:eq(${index})`).click();
        cy.intercept("GET", `/clubs/${club.id}`, {
          statusCode: 200,
          body: {
            id_UUID: clubs.id_UUID,
            id: clubs.id,
            club_name: clubs.club_name,
            club_adress: clubs.club_adress,
            club_foundation_year: clubs.club_foundation_year,
            image_path: clubs.image_path,
          },
        });
        cy.go("back");
      });
  });
});

describe("Update", () => {
  it("Must correctly update club's information", () => {
    cy.visit("/clubs");

    cy.get('[data-cy="table-random-clubs-home"]')
      .find('[data-cy="random-clubs-home"]')
      .each((club, index) => {
        //update en el detail
        cy.get(`[data-cy="view-club-href-home"]:eq(${index})`).click();

        cy.get('[data-cy="club-detail-button-update"]').click();
        cy.get("#update-club-popUp").should(
          "contain",
          "Club name:",
          "Club address:",
          "Club foundation year:",
          "Update Club",
          "Cancel"
        );

        cy.intercept("PUT", `/clubs/${club.id}`, {
          statusCode: 200,
          body: {
            club_name: "Boca Jrs.",
            club_adress: "Bombonera 123",
            club_foundation_year: "1920",
          },
        })

        cy.visit("/clubs");

        // update de home

        cy.get(`[data-cy="update-club-href-home"]:eq(${index})`).click();

        cy.get("#update-club-popUp").should(
          "contain",
          "Club name:",
          "Club address:",
          "Club foundation year:",
          "Update Club",
          "Cancel"
        );

        cy.intercept("PUT", `/clubs/${club.id}`, {
          statusCode: 200,
          body: {
            club_name: "River",
            club_adress: "Nuñez 4575",
            club_foundation_year: "1815",
          },
        })

        cy.visit("/clubs");
      });
  });
});

describe("Delete", () => {
  it("Must correctly delete the club", () => {
    cy.visit("/clubs");

    cy.get('[data-cy="table-random-clubs-home"]')
    .find('[data-cy="random-clubs-home"]')
    .each((club, index) => {

        //delete en el detail
        cy.get(`[data-cy="view-club-href-home"]:eq(${index})`).click();

        cy.get('[data-cy="club-detail-button-delete"]').click();

        cy.get("#delete-club-popUp").should(
          "contain",
          "Are you sure you want to delete this club?",
          "Yes",
          "No"
        );

        cy.intercept("DELETE", `/clubs/${club.id}`, {
          statusCode: 200,
        }).as("deleteClubRequestDetail");

        cy.visit("/clubs");

        //delete de home

        cy.get(`[data-cy="delete-club-href-home"]:eq(${index})`).click();

        cy.get("#delete-club-popUp").should(
          "contain",
          "Are you sure you want to delete this club?",
          "Yes",
          "No"
        );

        cy.intercept("DELETE", `/clubs/${club.id}`, {
          statusCode: 200,
        })
      });
  });
});
