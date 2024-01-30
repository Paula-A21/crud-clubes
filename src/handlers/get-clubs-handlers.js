const { getAllClubsController } = require("../controllers/get-clubs-controllers");

const getAllClubsHandler = async (req, res) => {
    
    const CLUBS = await getAllClubsController();

    try {

        if (req.path === '/') {
            const randomClubs = CLUBS.sort(() => 0.5 - Math.random()).slice(0, 3);
            res.render('home', { clubs: randomClubs });
        } else {
            res.status(200).json(CLUBS);
        }

    } catch (error) {

        if(!CLUBS) res.status(404).json({ error: error.message });
        
        res.status(500).json('An error has occurred' + error.message)
    }
};

module.exports = {
    getAllClubsHandler
};