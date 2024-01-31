const { Router } = require("express");
const router = Router();

const { getAllClubsHandler } = require("../handlers/get-clubs-handlers");
const { deleteClubHandler } = require("../handlers/delete-clubs-handlers");
const { updateClubHandler } = require("../handlers/put-clubs-handlers");
const {createClubHandler} = require("../handlers/post-clubs-handlers")

router.get('/', getAllClubsHandler);
router.post('/', createClubHandler);
router.delete('/', deleteClubHandler);
router.put('/', updateClubHandler);

module.exports = router;