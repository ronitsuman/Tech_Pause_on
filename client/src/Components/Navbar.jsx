
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Leaf } from "lucide-react";
import {useDispatch} from "react-redux";
import {logout} from "../redux/authslice"


const Navbar = () => {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/login")
    }
    return (
        <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center gap-12 z-10">
            <h1 className="text-xl font-bold text-gray-800 flex gap-1"><Leaf className="w-8 h-8 text-teal-600" /> TechPause</h1>
            <input
             type="text"
             className="w-[auto]  border-b-2 border-transparent focus:border-b-4 focus:border-b-gray-600 p-1 placeholder-gray-500 outline-none"
             placeholder="Search Here"
              />
            <div className="invisible md:visible  space-x-4">
                <Link to="/" className="text-gray-600 hover:text-red-500">Home</Link>
                <Link to="/about" className="text-gray-600 hover:text-red-500">About</Link>
                <Link to="/contact" className="text-gray-600 hover:text-red-500">Contact</Link>
                <Link to="/help" className="text-gray-600 hover:text-red-500">Help</Link>
                <button 
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 hover:text-red-400 hover:font-bold "
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
            </div>
            {/* <button  className='rounded-md hover:bg-green-500 p-2 bg-red-400' >Logout</button> */}
          
        </nav>
    );
};

export default Navbar;