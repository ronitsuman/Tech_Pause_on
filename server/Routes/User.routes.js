import express from "express";
import { 
    SignupController, VerifyEmailController, LoginController, 
    verifyEmail, verifyOtp, ResetPassword 
} from "../controller/User.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// User 
router.post('/signup', asyncHandler(SignupController));
router.get("/verify-email/:id/:token", asyncHandler(VerifyEmailController));
router.post("/login", asyncHandler(LoginController));
router.post("/check-email-otp", asyncHandler(verifyEmail));
router.post("/verify-OTP", asyncHandler(verifyOtp));
router.post("/reset-password", asyncHandler(ResetPassword));

export default router;
