import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getAllPositions,
  getPositionById,
} from "../controllers/positions.controllers";

const positionRouter = Router();

positionRouter.route("/").get(authenticate, getAllPositions);
positionRouter.route("/:id").get(authenticate, getPositionById);


export default positionRouter;