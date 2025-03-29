import express from "express";
import { 
    CreateBlog, getAllBlogs, getSingleBlog, getUserBlog, updateBlog
} from "../controller/blog.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import upload from "../Middleware/upload.js";

const router = express.Router();

// Blog 
router.post("/create/:id",upload.single("image"), asyncHandler(CreateBlog));
router.get("/getblog/:id", asyncHandler(getUserBlog));
router.patch("/updateblog/:id", asyncHandler(updateBlog));
router.get("/getSingleBlog/:id", asyncHandler(getSingleBlog));
router.get("/getAllBlogs", asyncHandler(getAllBlogs));

export default router;
