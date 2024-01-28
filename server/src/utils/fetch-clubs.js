const { Clubs } = require("../db");
const axios = require("axios");
const URL = "https://api.football-data.org/v4/competitions";

const fetchClubs = async () => {
  try {
    const {data} = await axios.get(`${URL}`);

    const {competitions} = data;

    console.log(competitions.slice(0, 2));

    const NEW_CLUB = Promise.all(
      competitions.map((club) => {
        console.log(club);
        const CREATE_CLUB = Clubs.create({
          id: club.id,
          country_name: club.area.name,
          cup_name: club.name,
          start_of_season: club?.currentSeason?.startDate,
          end_of_season: club?.currentSeason?.endDate,
          winner_name: club?.winner?.shortName,
          winner_adress: club?.winner?.address
        });
        console.log("Create club" + CREATE_CLUB);
        return CREATE_CLUB;
      })
    );
    
    console.log("Se creo correctamente el nuevo club" + NEW_CLUB);
    return NEW_CLUB;

  } catch (error) {
    throw new Error("There has been an error getting the clubs" + error.message);
  }
};

module.exports = {
  fetchClubs
};
