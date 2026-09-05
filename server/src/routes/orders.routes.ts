import { Router } from "express";
import {
  buyOrder,
  getAllOrders,
  getOrderById,
  sellOrder,
} from "../controllers/orders.controllers";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { orderValidationSchema } from "../validators/orders/order.validator";

const orderRouter = Router();

orderRouter.route("/").get(authenticate, getAllOrders);

orderRouter
  .route("/buy")
  .post(authenticate, validate(orderValidationSchema), buyOrder);

orderRouter
  .route("/sell")
  .post(authenticate, validate(orderValidationSchema), sellOrder);

orderRouter.route("/:orderId").get(authenticate, getOrderById);

export default orderRouter;
