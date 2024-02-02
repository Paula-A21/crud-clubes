import sequelize from '../models/db.js';
import ClubsModel from '../models/Clubs.js';

const Clubs = ClubsModel(sequelize);

const getClubsController = async (req, res) => {

  try {
    const clubs = await Clubs.findAll();
    const action = req.query.action; // Obtener el parámetro de consulta 'action'
    
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
      res.render('delete-club', { });
  } catch (error) {
      console.log(error);
  }

}

const detailClubController = async (req, res) => {

  try {
      res.render('detail-club', { });
  } catch (error) {
      console.log(error);
  }

}

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