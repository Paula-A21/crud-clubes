const { Clubs } = require("../db.js");

const getAllClubsController = async () => {
   
  const CLUBS = await Clubs.findAll();

  if(!CLUBS) throw new Error('No clubs were found in the database');

  return CLUBS;
};
  
  module.exports = {
    getAllClubsController
  };