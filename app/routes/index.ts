import express from "express";
import { root } from "../controllers/root";
import { notFound } from "../controllers/notfound";

import PowerBallController from "../controllers/powerball-controller";
import validateRequest from "../middlewares/validate-request";

const router = express.Router();

router.use(express.json());

const powerBallController = new PowerBallController();

// Routes
router.get("/", root);

router.post(
  "/ticket",
  validateRequest,
  powerBallController.determineWinOrLoss
);

// Fall Through Route
router.use(notFound);

export default router;
