import React, { useState } from "react";
import { useSelector } from "react-redux"; 
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import BlogCard from "../Components/BlogCard";
import Sidebar from "../Components/SideBar";
import CreatePost from "../PAges/CreatePost";
import MyPosts from "../Components/MyPosts";  

const Dashboard = () => {
    const [currentContent, setCurrentContent] = useState("posts"); // Default: Show all posts
    const { person } = useSelector((state) => state.auth);

    const userName = person ? person.name : "Guest";
    const id = person ? person.id : "123";

    const blogPosts = [
        { src: "/blog-mind.jpg", title: "Embracing Mindfulness", content: "Learn how to incorporate mindfulness into your daily routine.", time: "1 hour ago", author: "ronit" },
        { src: "/screen.jpg", title: "Digital Detox Tips", content: "Discover effective strategies to reduce screen time.", time: "1 hour ago", author: "ronit" },
        { src: "/blog-3.jpg", title: "Transform Your Life", content: "Inspiring stories from our community.", time: "1 hour ago", author: "ronit" },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <div className="flex w-auto md:mt-3">
                <Sidebar name={userName} id={id} onContentChange={setCurrentContent} />
                <div className="ml-16 mt-24 flex md:w-[100%] lg:w-[90%] flex-col p-2 md:mt-18 lg:ml-40">
                    <Header userName={userName} />

                    {/* Create Post Section */}
                    {currentContent === "createPost" && <CreatePost onContentChange={setCurrentContent} />}

                    {/* My Posts Section */}
                    {currentContent === "myPosts" && <MyPosts />}

                    {/* General Blog Posts */}
                    {currentContent === "posts" && (
                        <div className="mt-4 md:ml-24 flex flex-col gap-2 lg:w-[100%] lg:justify-between md:flex-col lg:flex-auto overflow-hidden lg:flex-row lg:ml-1">
                            {blogPosts.map((post, index) => (
                                <BlogCard key={index} time={post.time} author={post.author} src={post.src} title={post.title} content={post.content} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
