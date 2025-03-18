import { Blog } from "../Models/blog.model.js";
import CustomError from "../utils/Error.js";
import { Person } from "../Models/User.model.js";


export const CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params; // User ID

        if (!title || !content) throw new CustomError(400, "Title and Content are required");


        // Find user
        // const userExists = await Person.findById(id);
        // if (!userExists) throw new CustomError(404, "User not found");

        // Create Blog
        const blog = new Blog({ title, content, author: id });
        console.log(blog); 

        await blog.save();

        const updatedPerson =  await Person.findByIdAndUpdate(id,{$push:{createdBlogs: blog._id}})
        console.log(updatedPerson)
        

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

  