import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  addFunds,
  getFunds,
  withdrawFunds,
} from "../controllers/funds.controllers";

const fundRouter = Router();

fundRouter.route("/").get(authenticate, getFunds);
fundRouter.route("/add").post(authenticate, addFunds);
fundRouter.route("/withdraw").post(authenticate, withdrawFunds);


export default fundRouter;