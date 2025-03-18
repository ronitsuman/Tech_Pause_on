// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { FaPlus, FaList } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ name, id, onContentChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [isCollapsed, setIsCollapsed] = useState(true);
    // const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

   

    const handleCreatePostClick = () => {
        onContentChange('myPosts'); // Change the content to create post
        setIsOpen(false); // Optionally close the sidebar
    };

    const handleMyPostsClick = () => {
        onContentChange('posts'); // Change the content to show posts
        setIsOpen(false); // Optionally close the sidebar
    };

    return (
        <div className={`flex flex-col justify-between mt-16 lg:flex lg:flex-col lg:justify-between md:mt-17 fixed inset-y-1 z-10 left-0 transform bg-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <button onClick={toggleSidebar} className="p-2 -right-16 w-16 fixed bg-gray-800 border text-white top-14 md:left-2 z-10 md:hidden">
                {isOpen ? 'Close' : 'Open'} Menu
            </button>
            <div className="flex flex-col p-4 space-y-2"> 
                <div className="flex items-center p-2 hover:bg-gray-300 cursor-pointer"  onClick={handleCreatePostClick}>
                    <FaPlus className="mr-2" /> Create Post
                </div>
                {/* {!isCollapsed && (
                    <div className="pl-4">
                        <div className="p-2 hover:bg-gray-300 cursor-pointer">Create Post</div>
                       
                    </div>
                )} */}
                <div className="flex items-center p-2 hover:bg-gray-300 cursor-pointer" onClick={handleMyPostsClick}>
                    <FaList className="mr-2" /> My Posts
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <img src="/profile-pic.png" alt="profile-pic" className='rounded-full border' width={50} />
                <span className='text-gray-400 text-[10px]'>ID: {id}</span>
                <h1 className='text-center text-xl capitalize'>{name}</h1>
            </div>
        </div>
    );
};

export default Sidebar;