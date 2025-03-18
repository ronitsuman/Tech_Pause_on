import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const person = useSelector((state) => state.auth.person);
    const authorId = person?.id;

    useEffect(() => {
        const fetchPosts = async () => {
            if (!authorId) return;
            
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${authorId}`);
                setPosts(response.data); // Assuming API returns an array of posts
            } catch (error) {
                toast.error("Failed to load posts.");
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authorId]); // Run when authorId changes

    return (
        <div className="p-4 w-full max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">My Posts</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post.id} className="p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
                            <button className="mt-2 text-blue-500">Read More</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
