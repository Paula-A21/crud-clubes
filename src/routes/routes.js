const { Router } = require("express");
const router = Router();

const { getAllClubsHandler } = require("../handlers/get-clubs-handlers");
const { deleteClubHandler } = require("../handlers/delete-clubs-handlers");
const { updateClubHandler } = require("../handlers/put-clubs-handlers");
const {createClubHandler} = require("../handlers/post-clubs-handlers");
const { detailClubHandler } = require("../handlers/detail-club-handlers");

router.get('/all-clubs', getAllClubsHandler);
router.get('/home', getAllClubsHandler);
router.get('/club/:club_id', detailClubHandler);
router.post('/new-club', createClubHandler);
router.delete('/club/:club_id', deleteClubHandler);
router.put('/club/:club_id', updateClubHandler);

module.exports = router;