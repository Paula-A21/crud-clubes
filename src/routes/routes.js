const { Router } = require("express");
const router = Router();

const { getAllClubsHandler } = require("../handlers/get-clubs-handlers");

router.get('/', getAllClubsHandler);

module.exports = router;