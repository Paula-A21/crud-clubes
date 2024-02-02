import sequelize from '../models/db.js';
import ClubsModel from '../models/Clubs.js';

const Clubs = ClubsModel(sequelize);

const getAllClubsController = async (req, res) => {
   
  const clubs = await Clubs.findAll();
  if(!clubs) throw new Error('No clubs were found in the database');

  console.log('Entre a getAllClubsController');

  try {
    res.status(200).json(clubs)
  } catch (error) {
    console.log(error.message);
  }

  // try {
  //   if (req.path === '/clubs') {
  //     const randomClubs = clubs.sort(() => 0.5 - Math.random()).slice(0, 3);
  //     res.render('home', { clubs: randomClubs });
  //   } else {
  //       // res.status(200).json(CLUBS);
  //     res.render('all-clubs', { });
  //   }
  // } catch (error) {
  //   if(!clubs) res.status(404).json({ error: error.message });
        
  //   res.status(500).json('An error has occurred' + error.message)

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
  getAllClubsController,
  deleteClubController,
  detailClubController,
  createClubController,
  updateClubController
};