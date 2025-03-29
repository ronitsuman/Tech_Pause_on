import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; 
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import BlogCard from "../Components/BlogCard";
import Sidebar from "../Components/SideBar";
import CreatePost from "../PAges/CreatePost";
import MyPosts from "../Components/MyPosts";  
import Profile from "../Components/Profile";

const Dashboard = () => {
    const [currentContent, setCurrentContent] = useState("posts"); // Default: Show all posts
    const [loading, setLoading] = useState(false); 
    const [posts, setPosts] = useState([]); 

    const { person } = useSelector((state) => state.auth);
    console.log(person)
    const userName = person ? person.name : "Guest";
    const id = person ? person.id : "123";
    const authorId = person?.id;
    const profilePic = person?.profilePic || "/default-profile.png"; // ✅ Profile Picture
    

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
                    setPosts(response.data.newPerson.createdBlogs); // Store fetched posts
                } else {
                    setPosts([]); // 
                }
            } catch (error) {
                toast.error("Failed to load posts.");
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false); // 
            }
        };

        fetchPosts();
    }, [authorId, currentContent]); 

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <div className="flex w-auto">
                {/*  Sidebar me profilePic pass kiya */}
                <Sidebar name={userName} id={id} profilePic={profilePic} onContentChange={setCurrentContent} />
                
                <div className="ml-16 mt-24 flex md:w-[100%] lg:w-[90%] flex-col p-2 md:mt-26 lg:ml-40">
                    <Header userName={userName} />

                    {/* Create Post Section */}
                    {currentContent === "createPost" && <CreatePost onContentChange={setCurrentContent} />}

                    {/* My Posts Section */}
                    {currentContent === "myPosts" && <MyPosts onContentChange={setCurrentContent} currentContent={currentContent} />}

                    {/* Profile Section */}
                    {currentContent === 'profile' && <Profile userId={id} />}

                    {/* Blog Posts */}
                    {currentContent === "posts" && (
                        <div className="mt-4 md:ml-24 flex flex-col bg-gray-50 gap-4 lg:w-[100%] lg:justify-around md:flex-col lg:flex-wrap overflow-hidden lg:flex-row lg:ml-1">
                            {loading ? (
                                <p className="text-center text-gray-500">Loading posts...</p> 
                            ) : posts.length === 0 ? (
                                <p className="text-center text-gray-500">No posts found.</p> 
                            ) : (
                                posts.map((post) => (
                                    <BlogCard
                                        key={post._id} 
                                        time="Just now"
                                        author={userName}
                                        title={post.title}
                                        content={post.content.substring(0, 10) + "..."}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
