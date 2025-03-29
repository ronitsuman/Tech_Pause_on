import React, { useState } from 'react';
import { FaPlus, FaList } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Sidebar = ({ name, id, profilePic, onContentChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    console.log("Profile Pic URL:", profilePic); 

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleProfileClick = () => {
        onContentChange('profile');
        setIsOpen(false);
    };

    const handleCreatePostClick = () => {
        onContentChange('createPost');
        setIsOpen(false);
    };

    const handleMyPostsClick = () => {
        onContentChange('myPosts');
        setIsOpen(false);
    };

    return (
        <div className={`flex flex-col justify-between mt-16 lg:flex lg:flex-col lg:justify-between md:mt-23 lg:mt-17 fixed inset-y-1 z-10 left-0 transform bg-gray-200 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <button onClick={toggleSidebar} className="p-2 -right-16 w-16 fixed bg-gray-800 border text-white top-14 md:left-0  z-10 md:hidden">
                {isOpen ? 'Close' : 'Open'} Menu
            </button>
            <div className="flex flex-col p-4 space-y-2"> 
                <div className="flex items-center p-2 hover:bg-gray-300 cursor-pointer" onClick={handleCreatePostClick}>
                    <FaPlus className="mr-2" /> Create Post
                </div>
                <div className="flex items-center p-2 hover:bg-gray-300 cursor-pointer" onClick={handleMyPostsClick}>
                    <FaList className="mr-2" /> My Posts
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                {/* ✅ Profile Picture Dynamic URL */}
                <img 
                    src={profilePic } 
                    alt="profile-pic" 
                    className='rounded-full border w-12 h-12 object-cover' 
                />
                <span className='text-gray-400 text-[10px]'>ID: {id}</span>
                <h1 className='text-center text-xl capitalize'>{name}</h1>
                <button className='text-black text-base font-semibold p-2 cursor-pointer' onClick={handleProfileClick} >Profile Settings</button>
            </div>
        </div>
    );
};

export default Sidebar;
