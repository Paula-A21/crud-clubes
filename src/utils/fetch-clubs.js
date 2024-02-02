import { config } from "dotenv";
import sequelize from '../models/db.js';
import ClubsModel from '../models/Clubs.js';
config();

const Clubs = ClubsModel(sequelize);
import axios from 'axios';
import { downloadImages } from "./download-images.js";
const URL = "https://api.football-data.org/v4/teams";

const fetchClubs = async () => {
  try {

    const count = await Clubs.count();
    
    if (count > 0) { //en caso de que ya se hayan clubs registrados esta funcion no se sigue ejecutando
      return;
    }

    downloadImages(); //si no existen clubs, se descargan las imagenes de los emblemas localmente

    const {data} = await axios.get(`${URL}`, {
      headers: {
        'X-Auth-Token': process.env.API_TOKEN
      }
    });

    const {teams} = data;

    const new_club = await Promise.all(
      teams.map((club) => {
        const CREATE_CLUB = Clubs.create({
          id: club.id,
          club_name: club.shortName,
          club_adress: club.address,
          club_foundation_year:club.founded,
        });
  
        return CREATE_CLUB;
      })
    );
    
    return new_club;

  } catch (error) {
    throw new Error("There has been an error getting the clubs" + error.message);
  }
};

export default {
  fetchClubs
};
