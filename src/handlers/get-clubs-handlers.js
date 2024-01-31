const { getAllClubsController } = require("../controllers/get-clubs-controllers");

const getAllClubsHandler = async (req, res) => {
    
    const CLUBS = await getAllClubsController();

    try {

        if (req.path === '/home') {
            const randomClubs = CLUBS.sort(() => 0.5 - Math.random()).slice(0, 3);
            res.render('home', { clubs: randomClubs });
        } else {
            res.render('all-clubs', { });
        }

    } catch (error) {

        if(!CLUBS) res.status(404).json({ error: error.message });
        
        res.status(500).json('An error has occurred' + error.message)
    }
};

module.exports = {
    getAllClubsHandler
};