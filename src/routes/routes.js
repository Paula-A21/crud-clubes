import { Router } from "express";
const router = Router();

import { getAllClubsController } from "../controllers/clubs-controllers.js";
import { deleteClubController } from "../controllers/clubs-controllers.js";
import { updateClubController } from "../controllers/clubs-controllers.js";
import { createClubController } from "../controllers/clubs-controllers.js";
import { detailClubController } from "../controllers/clubs-controllers.js";


router.get('/clubs', getAllClubsController);
router.get('/clubs/:id_UUID', detailClubController);
router.post('/clubs', createClubController);
router.delete('/clubs/:id_UUID', deleteClubController);
router.put('/clubs/:id_UUID', updateClubController);

export default router;
