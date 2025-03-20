import { Blog } from "../Models/blog.model.js";
import CustomError from "../utils/Error.js";
import { Person } from "../Models/User.model.js";


export const CreateBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;  // ✅ Include category
        const { id } = req.params;

        console.log("Received Data:", { title, content, category }); // ✅ Debug Log

        if (!title || !content || !category) {  // ✅ Now checking category too
            throw new CustomError(400, "Title, Content, and Category are required");
        }

        const blog = new Blog({ title, content, category, author: id });  // ✅ Include category
        await blog.save();

        await Person.findByIdAndUpdate(id, { $push: { createdBlogs: blog._id } });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error("Error creating blog:", error);  // ✅ Debug backend error
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

export const getUserBlog = async(req,res) => {
    const {id} = req.params
    console.log("existising user id ",id)

    const newPerson = await Person.findById(id).populate("createdBlogs")
    console.log("user dats", newPerson)

    if(!newPerson){
        throw new CustomError(400,"user not found")
    }
    return res.status(200).json({message:"user data fetched ",newPerson})
} 

// update blog
export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { title, content } = req.body; // Sirf yahi update karna hai

        console.log("Updating Blog:", { id, title, content }); // Debugging Log

        //  if Blog Exists
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            throw new CustomError(404, "Blog not found");
        }

        //  Update title & content
        existingBlog.title = title || existingBlog.title;
        existingBlog.content = content || existingBlog.content;

        await existingBlog.save();

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            updatedBlog: existingBlog,
        });

    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};

//  Get Single Blog
export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID

        console.log("Fetching Blog ID:", id); 

        const blog = await Blog.findById(id).populate("author", "name"); // Author Details

        if (!blog) {
            throw new CustomError(404, "Blog not found");
        }

        res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            blog,
        });

    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};


  