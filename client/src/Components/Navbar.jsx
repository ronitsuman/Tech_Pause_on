
import React from 'react';
import { Link } from 'react-router-dom';
import {  Leaf } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-10">
            <h1 className="text-xl font-bold text-gray-800 flex gap-1"><Leaf className="w-8 h-8 text-teal-600" /> TechPause</h1>
            <div className="space-x-4">
                <Link to="/" className="text-gray-600 hover:text-red-500">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-red-500">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-red-500">Contact</Link>
                <Link to="/help" className="text-gray-600 hover:text-red-500">Help</Link>
            </div>
        </nav>
    );
};

export default Navbar;