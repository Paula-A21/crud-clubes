const { Clubs } = require("../db");
const axios = require("axios");
const URL = "https://api.football-data.org/v4/teams";

const fetchClubs = async () => {
  try {

    const count = await Clubs.count();
    
    if (count > 0) { //en caso de que ya se hayan clubs registrados esta funcion no se sigue ejecutando
      return;
    }

    const {data} = await axios.get(`${URL}`, {
      headers: {
        'X-Auth-Token': '2cba144727404798acb1f39490a5cf20'
      }
    });

    const {teams} = data;

    const NEW_CLUB = Promise.all(
      teams.map((club) => {
        console.log(club);
        const CREATE_CLUB = Clubs.create({
          id: club.id,
          club_name: club.shortName,
          club_adress: club.address,
          club_foundation_year:club.founded,
        });
  
        return CREATE_CLUB;
      })
    );
    console.log(NEW_CLUB)
    return NEW_CLUB;

  } catch (error) {
    throw new Error("There has been an error getting the clubs" + error.message);
  }
};

module.exports = {
  fetchClubs
};
