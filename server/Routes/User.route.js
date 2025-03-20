import express from "express";
import { SignupController,VerifyEmailController,LoginController,verifyEmail,verifyOtp,ResetPassword } from "../controller/User.controller.js";
import authChecker from "../Middleware/authchecker.js";
import asyncHandler from "../utils/asyncHandler.js";
import {CreateBlog, getAllBlogs, getSingleBlog, getUserBlog, updateBlog} from "../controller/blog.controller.js"

export const Route = express.Router();

Route.post('/signup', asyncHandler(SignupController)) 

Route.get("/verify-email/:id/:token", asyncHandler(VerifyEmailController));


Route.post("/login", asyncHandler(LoginController))

Route.post("/check-email-otp" , asyncHandler(verifyEmail))      

 // /authChecker,

Route.post("/verify-OTP" , asyncHandler(verifyOtp))

Route.post("/reset-password", asyncHandler(ResetPassword) )

// blog api
Route.post("/create/:id",  asyncHandler(CreateBlog));
Route.get("/getblog/:id",  asyncHandler(getUserBlog));
Route.patch("/updateblog/:id", asyncHandler(updateBlog));
Route.get("/getSingleBlog/:id",asyncHandler(getSingleBlog))
Route.get("/getAllBlogs", asyncHandler(getAllBlogs));

 