import {Blog} from "../Models/blog.model.js";
import CustomError from "../utils/Error.js";
import {Person} from "../Models/User.model.js"


// export const CreateBlog = async (req, res) => {
//     const { title, content } = req.body;
//     const {id} = req.params
//     if (!title || !content) throw new CustomError(400, "Title and Content are required");

//     const blog = new Blog({ title, content, author:id});
//     console.log(
//         blog
//     )

//     await blog.save();

//     res.status(201).json({ success: true, message: "Blog created successfully", blog });
// };



export const CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params; // User ki ID jo params se aa rahi hai

        if (!title || !content) throw new CustomError(400, "Title and Content are required");

        
        const userExists = await User.findById(id);
        if (!userExists) throw new CustomError(404, "User not found");

        
        const blog = new Blog({ title, content, author: id });

        await blog.save();

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


  