import express from "express";
import { addComment, commentCount } from "../controller/blog.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Comments 
router.post("/addComment/:PersonID/:blogId", asyncHandler(addComment));
router.get("/comments/count/:postId", asyncHandler(commentCount));

export default router;
