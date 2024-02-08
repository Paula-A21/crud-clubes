import { Router } from "express";
const router = Router();

import ClubController from "../controllers/ClubController.js";
const clubController = new ClubController();

router.get('/clubs', clubController.getClubsHome.bind(clubController));
router.get('/clubs/:id', clubController.getClubDetail.bind(clubController));
router.post('/clubs', clubController.createClub.bind(clubController));
router.delete('/clubs/:id', clubController.deleteClub.bind(clubController));
router.put('/clubs/:id', clubController.updateClub.bind(clubController));

export default router;
