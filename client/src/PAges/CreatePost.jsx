import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";  
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = ({ onContentChange }) => {  // Accept `onContentChange` as prop
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");  
    const [isSubmitting, setIsSubmitting] = useState(false);

    const person = useSelector((state) => state.auth.person);
    const authorId = person?.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!authorId) {
            toast.error("User ID not found. Please login.");
            return;
        }
        if (!category) {
            toast.error("Please select a category.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(`http://localhost:3000/api/blogs/create/${authorId}`, { 
                title, 
                content,
                category  
            });

            console.log("Server Response:", response.data); 

            if (response.data?.success) {
                toast.success("Post submitted successfully!");

                // ✅ Refresh MyPosts section
                onContentChange("myPosts");  
            } else {
                toast.error(response.data?.message || "Failed to submit post.");
            }
        } catch (error) {
            console.error("Submission error:", error.response ? error.response.data : error); 
            toast.error(error.response?.data?.message || "Failed to submit post.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    
    return (
        <div className="mt-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md lg:max-w-6xl lg:mt-8">
            <h1 className="text-2xl font-bold text-center mb-4">Submit a Blog Post</h1>
            <form onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Content Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="5"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        disabled={isSubmitting}
                    />
                </div>

                {/* Category Selection */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        disabled={isSubmitting}
                    >
                        <option value="" disabled>Select your focus area</option>
                        <option value="Work-Life Balance">Work-Life Balance</option>
                        <option value="Social Media Detox">Social Media Detox</option>
                        <option value="Mindfulness Practice">Mindfulness Practice</option>
                        <option value="Better Sleep Habits">Better Sleep Habits</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
