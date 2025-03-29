import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaComment } from "react-icons/fa"; // Comment icon

const MyPosts = ({ onContentChange, currentContent }) => {  
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentCounts, setCommentCounts] = useState({}); // Store comments count
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
    
    const navigate = useNavigate();
    const person = useSelector((state) => state.auth.person);
    const authorId = person?.id;

    useEffect(() => {
        const fetchPosts = async () => {
            if (!authorId) {
                console.error("User ID not found!");
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/blogs/getblog/${authorId}`);
                console.log("API Response:", response.data);

                if (response.data?.newPerson?.createdBlogs) {
                    const blogs = response.data.newPerson.createdBlogs;
                    setPosts(blogs);

                    // Fetch comments count for each post
                    const counts = {};
                    for (let post of blogs) {
                        try {
                            const countRes = await axios.get(`http://localhost:3000/api/comments/comments/count/${post._id}`);
                            counts[post._id] = countRes.data.count || 0;
                        } catch (err) {
                            console.error(`Error fetching comments for ${post._id}:`, err);
                        }
                    }
                    setCommentCounts(counts);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                toast.error("Failed to load posts.");
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [authorId, currentContent, onContentChange]);

    const handleEditClick = (post) => {
        setSelectedPost(post);
        setEditedTitle(post.title);
        setEditedContent(post.content);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const updatedPost = { ...selectedPost, title: editedTitle, content: editedContent };

            await axios.patch(`http://localhost:3000/api/blogs/updateblog/${selectedPost._id}`, updatedPost);

            setPosts((prev) =>
                prev.map((post) => (post._id === selectedPost._id ? updatedPost : post))
            );

            toast.success("Post updated successfully!");
            setShowModal(false);
        } catch (error) {
            toast.error("Failed to update post.");
        }
    };

    return (
        <div className="ml-1 bg-gray-100 md:ml-22 p-4 w-full max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">My Posts</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post._id} className="p-4 border rounded-lg shadow-md bg-white">
                            <img src={post.image} alt="" />
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{post.content.substring(0, 10)}...</p>
                            
                            <div className="flex justify-between items-center">
                                <button className="mt-2 text-blue-500" onClick={() => navigate(`/post/${post._id}`)}>Read More</button>

                                {/* Comment Icon with Count */}
                                <div className="flex items-center">
                                    <FaComment className="text-gray-500 mr-1" size={18} />
                                    <span className="text-gray-600">{commentCounts[post._id] || 0}</span>
                                </div>

                                <button className="mt-2 text-red-500" onClick={() => handleEditClick(post)}>Edit</button>
                            </div>
                        </div>
                    ))}

                    {/* Edit Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md lg:w-[]">
                                <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                                
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded mb-3"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />

                                <textarea
                                    className="w-full p-2 border rounded mb-3"
                                    rows="4"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                ></textarea>

                                <div className="flex justify-end">
                                    <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>
                                        Cancel
                                    </button>
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyPosts;
