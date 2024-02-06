import { Router } from "express";
const router = Router();

import { clubsController } from "../controllers/clubs-controllers.js";



router.get('/clubs', clubsController);
router.get('/clubs/:id_UUID', clubsController);
router.post('/clubs', clubsController);
router.delete('/clubs/:id_UUID', clubsController);
router.put('/clubs/:id_UUID', clubsController);

export default router;
