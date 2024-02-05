import sequelize from '../models/db.js';
import ClubsModel from '../models/Clubs.js';
// import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const Clubs = ClubsModel(sequelize);

const getClubsController = async (req, res) => {

  try {
    
    const clubs = await Clubs.findAll();
    const action = req.query.action; 

    if (!clubs || clubs.length === 0) {
      return res.status(404).json({ error: 'No clubs were found in the database' });
    }

    if (action) {
      if (action === 'view-all') {
        res.render('all-clubs',{ clubs });
      }
    } else {

      const randomClubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 3);
      res.render('home', { clubs: randomClubs });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const deleteClubController = async (req, res) => {

  try {

  res.render('delete-club', {});

} catch (error) {

  console.log(error);

}

}

const detailClubController = async (req, res) => {
  
  const { id_UUID } = req.params;
  const club_detail = await Clubs.findByPk(id_UUID);

  if (!club_detail) {
    return res.status(404).json({ error: 'The club was not found' });
  }

  const formattedClubName = club_detail.club_name.toLowerCase().replace(/ /g, "_");
  const imagePath = `/images/crests/${formattedClubName}.png`;

  try {
    res.render('detail-club', { club_detail, imagePath });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'An error has occurred' });
  }
};

const createClubController = async (req, res) => {
  try {

      res.render('create-club', {});

  } catch (error) {

      console.log(error);

  }

}

const updateClubController = async (req, res) => {

  try {

      res.render('edit-club', { });

  } catch (error) {

      console.log(error);

  }

}

export {
  getClubsController,
  deleteClubController,
  detailClubController,
  createClubController,
  updateClubController
};