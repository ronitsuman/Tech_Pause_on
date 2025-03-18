import React, { useState } from "react"; 
import { useSelector } from "react-redux"; 
import axios from "axios";
import { toast } from "react-toastify"; // ✅ Toast import kiya
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // ✅ Navigation ke liye

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // ✅ Navigation hook

    // ✅ FIXED: useSelector ko component ke andar function ke pehle call kiya
    const person = useSelector((state) => state.auth.person);
    console.log("Person from Redux:", person);
    const authorId = person?.id; // ✅ `_id` ko `id` ki jagah set karo

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (!authorId) {
                console.error("Error: User ID not found!");
                toast.error("User ID not found. Please login.");
                return;
            }

            // ✅ API Request
            const response = await axios.post(
                `http://localhost:3000/api/create/${authorId}`,
                { title, content }
            );

            if (response.status === 201) {
                toast.success("Post submitted successfully!");
                navigate('/dashboard'); // ✅ Redirect
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            toast.error("Failed to submit post. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4 w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md lg:max-w-6xl lg:mt-8">
            <h1 className="text-2xl font-bold text-center mb-4">Submit a Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="content">
                        Content:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="5"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className={`bg-green-500 text-white px-4 py-2 rounded-md transition duration-200 ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                        }`}
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
