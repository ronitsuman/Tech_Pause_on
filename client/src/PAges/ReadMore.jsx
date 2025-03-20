import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ReadMore = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/getSingleBlog/${id}`);
                setPost(response.data.blog);
            } catch (error) {
                toast.error("Failed to load post.");
                navigate("/dashboard");
            }
        };

        fetchPost();
    }, [id, navigate]);

    if (!post) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-2">By {post?.author?.name || "Unknown"}</p>

            {/* 🛠 Convert newline characters into <br/> tags */}
            <p className="text-gray-700 whitespace-pre-line">
                {post.content}
            </p>

            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/dashboard")}
            >
                Go Back
            </button>
        </div>
    );
};

export default ReadMore;
