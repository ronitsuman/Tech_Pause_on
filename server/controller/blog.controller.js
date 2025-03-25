import { Blog } from "../Models/blog.model.js";
import CustomError from "../utils/Error.js";
import { Person } from "../Models/User.model.js";

//create blog 
export const CreateBlog = async (req, res) => {
    try {
        const { title, content, category } = req.body;  
        const { id } = req.params;

        console.log("Received Data:", { title, content, category }); 

        if (!title || !content || !category) {  
            throw new CustomError(400, "Title, Content, and Category are required");
        }

        const blog = new Blog({ title, content, category, author: id });  
        await blog.save();

        await Person.findByIdAndUpdate(id, { $push: { createdBlogs: blog._id } });

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        });

    } catch (error) {
        console.error("Error creating blog:", error);  
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

//get user all blogs 

export const getUserBlog = async(req,res) => {
    const {id} = req.params
    console.log("existising user id ",id)

    const newPerson = await Person.findById(id).populate("createdBlogs")
    

    if(!newPerson){
        throw new CustomError(400,"user not found")
    }
    return res.status(200).json({message:"user data fetched ",newPerson})
} 

// update blog 

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { title, content } = req.body; 

        console.log("Updating Blog:", { id, title, content }); 

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

//  Get Single  post

export const getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID

        console.log("Fetching Blog ID:", id); 

        const blog = await Blog.findById(id)
        .populate("author", "name")
        .populate("comments.person","name"); // Author Details

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


//get all blogs from user 

export const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.find().populate("author", "name");
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs", error });
    }
  };

//add comment
export const addComment = async (req, res) => {
    try {
        const { PersonID, blogId } = req.params; // Fix: req.params
        const { comment } = req.body;

        if (!comment) {
            throw new CustomError(400, "All fields are required"); // Fix: No {}
        }

        const user = await Person.findById(PersonID);
        if (!user) {
            throw new CustomError(404, "User not found");
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new CustomError(404, "Blog not found");
        }

        const newComment = {
            person: PersonID,
            text: comment,  //  `
            name: user.name, //  User ka naam store karein
            createdAt: new Date(),
        };

        // Push new comment to blog
        blog.comments.push( newComment ); // ✅ `comment` ko `text` ke sath store karein


        // Save the blog after modification
        await blog.save(); 

        // Send success response
        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            blog,
        });

    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};


  