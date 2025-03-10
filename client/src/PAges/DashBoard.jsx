// src/pages/Dashboard.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
    const userName = "Ronit suman "; // Replace 

    // Sample blog posts
    const blogPosts = [
        { src:"/blog-mind.jpg" ,title:"Embracing Mindfulness", content: "Learn how to incorporate mindfulness into your daily routine.",time:"1 hour ago", author:"ronit" },
        { src:"/screen.jpg" ,title: "Digital Detox Tips", content: "Discover effective strategies to reduce screen time.",time:"1 hour ago", author:"ronit" },
        {src:"/15.jpg" ,title: "Transform Your Life", content: "Inspiring stories from our community." ,time:"1 hour ago", author:"ronit"},
    ];

    return (
        <div className="flex flex-col   h-screen bg-gray-50">
            <Navbar />
            <div className="flex w-auto  md:mt-2  ">
                <Sidebar />
                <div className="ml-16 flex    md:w-[100%] lg:w-[90%]   flex-col p-2 mt-16 lg:ml-40  "> {/* Added margin-left to avoid overlap with sidebar */}
                    <Header userName={userName} />
                    <div className="mt-4 md:ml-24 md:mt-4 flex flex-col  gap-2  lg:w-[100%] lg:justify-between  md:flex-col lg:flex-auto overflow-hidden lg:flex-row   lg:ml-1 z-2  ">
                        {blogPosts.map((post, index) => (
                            <BlogCard key={index} time={post.time} author={post.author} src={post.src} title={post.title} content={post.content} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;