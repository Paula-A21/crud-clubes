import { Router } from "express";
const router = Router();

import { crudClubs } from "../controllers/clubs-controllers.js";



router.get('/clubs', crudClubs);
router.get('/clubs/:id_UUID', crudClubs);
router.post('/clubs', crudClubs);
router.delete('/clubs/:id_UUID', crudClubs);
router.put('/clubs/:id_UUID', crudClubs);

export default router;
