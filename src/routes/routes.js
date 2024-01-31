const { Router } = require("express");
const router = Router();

const { getAllClubsHandler } = require("../handlers/get-clubs-handlers");
const { deleteClubHandler } = require("../handlers/delete-clubs-handlers");
const { updateClubHandler } = require("../handlers/put-clubs-handlers");
const {createClubHandler} = require("../handlers/post-clubs-handlers")

router.get('/', getAllClubsHandler);
router.post('/club', createClubHandler);
router.delete('/club/:club_id', deleteClubHandler);
router.put('/club/:club_id', updateClubHandler);

module.exports = router;