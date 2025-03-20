import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyPosts = ({ onContentChange, currentContent }) => {  
    const [posts, setPosts] = useState([]); // Stores user's posts
    const [loading, setLoading] = useState(true); // Loading state
    const [showModal, setShowModal] = useState(false); // Controls Edit Modal visibility
    const [selectedPost, setSelectedPost] = useState(null); // Stores selected post for editing
    const [editedTitle, setEditedTitle] = useState(""); // Stores edited title
    const [editedContent, setEditedContent] = useState(""); // Stores edited content
    
    const navigate = useNavigate() //navigation hook

    // Getting logged-in user data from Redux
    const person = useSelector((state) => state.auth.person);
    const authorId = person?.id; // Extracts user ID

    // Fetching posts when component loads or dependencies change
    useEffect(() => {
        const fetchPosts = async () => {
            if (!authorId) {
                console.error("User ID not found!");
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/getblog/${authorId}`);
                console.log("API Response:", response.data); 

                // If user has posts, update state; otherwise, set empty array
                if (response.data?.newPerson?.createdBlogs) {
                    setPosts(response.data.newPerson.createdBlogs);
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
    }, [authorId, currentContent, onContentChange]); // Runs when any dependency changes

    // Opens the edit modal and sets the selected post data
    const handleEditClick = (post) => {
        setSelectedPost(post);
        setEditedTitle(post.title);
        setEditedContent(post.content);
        setShowModal(true);
    };

    // Saves the edited post and updates state
    const handleSave = async () => {
        try {
            const updatedPost = { ...selectedPost, title: editedTitle, content: editedContent };

            await axios.patch(`http://localhost:3000/api/updateblog/${selectedPost._id}`, updatedPost);

            // Updating UI instantly
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
        <div className="ml-22 p-4 w-full max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">My Posts</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <div key={post._id} className="p-4 border rounded-lg shadow-md bg-white">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
                            <div className="flex justify-between">
                                <button className="mt-2 text-blue-500" onClick={()=>navigate(`/post/${post._id}`)}>Read More</button>
                                <button className="mt-2 text-red-500" onClick={() => handleEditClick(post)}>Edit</button>
                            </div>
                        </div>
                    ))}

                    {/* Edit Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                                <h2 className="text-xl font-bold mb-4">Edit Post</h2>
                                
                                {/* Title Input */}
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded mb-3"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                />

                                {/* Content Input */}
                                <textarea
                                    className="w-full p-2 border rounded mb-3"
                                    rows="4"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                ></textarea>

                                {/* Buttons */}
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
