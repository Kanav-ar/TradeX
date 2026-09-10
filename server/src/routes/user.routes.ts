import { Router } from "express";
import {
  changePassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/user.controllers";
import { validate } from "../middlewares/validation.middleware";
import { registerValidationSchema } from "../validators/user/register.validator";
import { loginValidationSchema } from "../validators/user/login.validator";
import { authenticate } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter
  .route("/signup")
  .post(validate(registerValidationSchema), registerUser);

userRouter.route("/login").post(validate(loginValidationSchema), loginUser);

userRouter.route("/verify-email/:verificationToken").post(verifyEmail);

userRouter.route("/forgot-password").post(forgotPasswordRequest);
userRouter
  .route("/reset-password/:resetPasswordToken")
  .post(resetForgotPassword);

userRouter.route("/refresh-token").post(refreshAccessToken)

// protected routes
userRouter.route("/me").get(authenticate, getCurrentUser);
userRouter.route("/logout").post(authenticate, logoutUser);
userRouter.route("/resend").post(authenticate, resendEmailVerification);
userRouter.route("/change-password").post(authenticate, changePassword);

export default userRouter;
