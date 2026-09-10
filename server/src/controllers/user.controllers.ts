import type { CookieOptions, NextFunction, Request, Response } from "express";
import WrapAsync from "../utils/WrapAsync";
import { User, type IUser } from "../models/user.models";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { refreshTokenPayloadSchema } from "../validators/user/refreshToken.validator";
import { sendEmail } from "../services/email/email.service";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === "true",
  sameSite: process.env.COOKIE_SECURE === "true" ? "none" : "lax",
};

const generateAccessAndRefreshTokens = (user: IUser) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  return { accessToken, refreshToken };
};

const registerUser = WrapAsync(async (req: Request, res: Response) => {
  const { username, email, fullname, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    if (existingUser.username === username) {
      throw new ApiError(409, "Username already exist");
    }

    if (existingUser.email === email) {
      throw new ApiError(409, "Email already exist");
    }
  }

  const newUser = new User({
    username,
    email,
    password,
    fullname,
    isEmailVerified: false,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    newUser.generateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  await sendEmail({
    email: newUser.email,
    username: newUser.username,
    verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${unHashedToken}`,
    subject: "Welcome to TradeX",
    emailType: "welcome",
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registered successfully and verification link has been sent to your email",
      ),
    );
});

const loginUser = WrapAsync(async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({
    $or: [
      { username: identifier.toLowerCase() },
      { email: identifier.toLowerCase() },
    ],
  });

  if (!user) {
    throw new ApiError(404, "Invalid credentials");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User logged in successfully",
      ),
    );
});

const logoutUser = WrapAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const loggedOutUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      returnDocument: "after",
    },
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(
      new ApiResponse(200, { loggedOutUser }, "User logged out successfully"),
    );
});

const getCurrentUser = WrapAsync(async (req: Request, res: Response) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "Current user fetched successfully",
      ),
    );
});

const refreshAccessToken = WrapAsync(async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  const secret = process.env.REFRESH_TOKEN_SECRET;
  if (!secret) {
    throw new Error("Token can't be verified");
  }
  const decodedRefreshToken = jwt.verify(incomingRefreshToken, secret);

  const validDecodedToken =
    refreshTokenPayloadSchema.safeParse(decodedRefreshToken);

  if (!validDecodedToken.success) {
    throw new ApiError(403, "Invalid token");
  }

  const user = await User.findById(validDecodedToken.data?._id);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh token is expired");
  }

  const { accessToken, refreshToken: newRefreshToken } =
    generateAccessAndRefreshTokens(user);

  user.refreshToken = newRefreshToken;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", newRefreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: newRefreshToken },
        "Access token refreshed successfully",
      ),
    );
});

const verifyEmail = WrapAsync(async (req: Request, res: Response) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    throw new ApiError(400, "Email verification token is missing");
  }

  let hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken as string)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Email verification token is invalid");
  }

  user.emailVerificationToken = undefined;
  user.emailVerificationExpiry = undefined;

  user.isEmailVerified = true;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { isEmailVerified: true }, "Email is verified"));
});

const resendEmailVerification = WrapAsync(
  async (req: Request, res: Response) => {
    const user = await User.findById(req.user?._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified === true) {
      throw new ApiError(409, `${user.email} is already verified`);
    }

    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
      email: user.email,
      emailType: "verify",
      subject: "Verify your email",
      username: user.username,
      verificationUrl: `${process.env.FRONTEND_URL}/verify-email/${unHashedToken}`,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Verification link has been sent to your email id",
        ),
      );
  },
);

const forgotPasswordRequest = WrapAsync(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email entered is not valid");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(
      404,
      "If an account exists for this email, a password reset link has been sent.",
    );
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordTokenExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    username: user.username,
    email: user.email,
    emailType: "forgotPassword",
    subject: "Reset your password",
    verificationUrl: `${process.env.FRONTEND_URL}/reset-password/${unHashedToken}`,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset link has been sent on your registered email",
      ),
    );
});

const resetForgotPassword = WrapAsync(async (req: Request, res: Response) => {
  const { resetPasswordToken } = req.params;
  const { newPassword, confirmPassword } = req.body;

  if (!resetPasswordToken) {
    throw new ApiError(400, "Invalid request");
  }

  const hashedResetPasswordToken = crypto
    .createHash("sha256")
    .update(resetPasswordToken as string)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedResetPasswordToken,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password donot match");
  }

  const isDuplicate = await user.isPasswordCorrect(newPassword);
  if (isDuplicate) {
    throw new ApiError(400, "New password must be different from old one");
  }

  user.password = newPassword;

  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password has been updated successfully"));
});

const changePassword = WrapAsync(async (req: Request, res: Response) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Current password is not valid");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password don't match");
  }

  const isDuplicate = await user.isPasswordCorrect(newPassword);

  if (isDuplicate) {
    throw new ApiError(
      400,
      "New password must be different from the previous ones",
    );
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  refreshAccessToken,
  verifyEmail,
  resendEmailVerification,
  forgotPasswordRequest,
  resetForgotPassword,
  changePassword,
};
