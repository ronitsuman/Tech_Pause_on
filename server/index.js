import express from "express";
import cors from "cors";
import dbConnect from "./Database/dbConnection.js";
import userRoutes from "./Routes/User.routes.js";  
import blogRoutes from "./Routes/blog.routes.js";
import commentRoutes from "./Routes/comment.routes.js";
import cookieParser from "cookie-parser";
import { updateBlog } from "./controller/blog.controller.js";
import uploadRoutes from './Routes/upload.routes.js'

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
(async () => {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(` Server is running on port ${PORT}`);
            console.log(" Database is connected");
        });
    } catch (error) {
        console.log(" Database connection error:", error.message);
    }
})();

// Middlewares
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
    exposedHeaders: ["Authorization"],
}));

app.use(express.json()); 
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/upload",uploadRoutes)

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ success: false, message });
    console.error(` Error [${statusCode}]: ${message}`);
});

export default app;
