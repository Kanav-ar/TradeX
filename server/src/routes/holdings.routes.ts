import { Router } from "express";
import {
  addHolding,
  deleteHolding,
  getAllHoldings,
} from "../controllers/holdings.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const holdingRouter = Router();

holdingRouter
  .route("/")
  .get(authenticate, getAllHoldings)
  .post(authenticate, addHolding);
holdingRouter.route("/:id").delete(authenticate, deleteHolding);

export default holdingRouter;
