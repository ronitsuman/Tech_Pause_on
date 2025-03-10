import express from "express";
import { SignupController,VerifyEmailController,LoginController,verifyEmail,verifyOtp,ResetPassword } from "../controller/User.controller.js";
import authChecker from "../Middleware/authchecker.js";
import asyncHandler from "../utils/asyncHandler.js";

export const Route = express.Router();

Route.post('/signup', asyncHandler(SignupController)) 

Route.get("/verify-email/:id/:token", asyncHandler(VerifyEmailController));


Route.post("/login", asyncHandler(LoginController))

Route.post("/check-email-otp" ,authChecker, asyncHandler(verifyEmail))

Route.post("/verify-OTP" , asyncHandler(verifyOtp) )

Route.post("/reset-password", asyncHandler(ResetPassword) )

