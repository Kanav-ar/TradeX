import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers";
import app from "../app";

const router = Router();


router.route("/").get(healthCheck);

export default router;
