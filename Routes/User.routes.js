import express from "express";
import { 
    SignupController, VerifyEmailController, LoginController, 
    verifyEmail, verifyOtp, ResetPassword,
     
    
} from "../controller/User.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import upload from '../Middleware/upload.js'

const router = express.Router();

// User 
router.post('/signup', asyncHandler(SignupController));
router.get("/verify-email/:id/:token", asyncHandler(VerifyEmailController));
router.post("/login", asyncHandler(LoginController));
router.post("/check-email-otp", asyncHandler(verifyEmail));
router.post("/verify-OTP", asyncHandler(verifyOtp));
router.post("/reset-password", asyncHandler(ResetPassword));

// router.post("/upload ",upload.single('file').(req,resizeBy,file )=>{
//     console.log(req.file)
//     res.send("file uploaded succesfully ")
// })

// router.put("/update-profile", upload.single("profilePic"), asyncHandler(updateProfile));
// router.put("/update-profile",  updateProfile);

export default router;
