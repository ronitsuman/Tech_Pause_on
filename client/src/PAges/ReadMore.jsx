import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ReadMore = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]); // Comments store karne ke liye state
    const [newComment, setNewComment] = useState(""); // New comment ke liye state
    const navigate = useNavigate();
    const person = useSelector((state)=>state.auth.person);
    const userId = person?.id; //  Redux


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/blogs/getSingleBlog/${id}`);
                setPost(response.data.blog);
                setComments(response.data.blog.comments || []); // Pehle se existing comments load karein
            } catch (error) {
                toast.error("Failed to load post.");
                navigate("/dashboard");
            }
        };

        fetchPost();
    }, [id, navigate]);

    // Comment submit 
    const handleCommentSubmit = async () => {
        if (!userId){
            console.error("user id missing ");
            return;
        }
        if (!newComment.trim()) {
            toast.warn("Comment cannot be empty!");
            return;
        }
    
        try {
             
            const response = await axios.post(`http://localhost:3000/api/comments/addComment/${userId}/${id}`, {
                comment: newComment // 
            });
    
            
            setComments([...comments, { 
                person: userId, 
                name: person?.name || "Unknown", //  user name from Redux
                text: newComment, 
                createdAt: new Date()
            }]); 
            setNewComment("");  
            toast.success("Comment added successfully!");
        } catch (error) {
            toast.error("Failed to add comment.");
        }
    };
    
    if (!post) return <p className="text-center text-gray-500">Loading...</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white shadow-md rounded-lg">
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => navigate("/dashboard")}
            >
                Go Back
            </button>

            <h1 className="mt-5 text-3xl font-bold mb-4">{post.title}</h1>
            <img src={post.image} alt="" />
            <p className="text-gray-500 mb-2">By {post?.author?.name || "Unknown"}</p>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>

            {/* Comment Section */}
            <div className="mt-8  ">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                
                {/* Display Existing */}
                {comments.length > 0 ? (

                    <ul className="mb-4 space-y-4  ">
                        {comments.map((comment, index) => (
                            <li key={index} className="border p-8 bg-gray-200 rounded-4xl space-y-2   border-gray-300 py-4">
                                 <p className="font-semibold text-gray-900"><span className="font-normal text-gray-500 " >from </span>{comment.person?.name || "Unknown User"} </p> 
                                <p className="text-gray-700">{comment.text || comment.comment}</p>
                                <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p> 
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}

                {/* Add New Comment */}
                <div className="mt-4">
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows="3"
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded pointer"
                        onClick={handleCommentSubmit}
                    >
                        Submit Comment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReadMore;
