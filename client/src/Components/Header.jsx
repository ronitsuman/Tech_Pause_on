
import React from 'react';

const Header = ({ userName }) => {
    return (
        <header className="  p-4 bg-blue-100 text-gray-800 md:ml-24 lg:ml-0 ">
            <h2 className="text-2xl font-semibold">Welcome back, {userName}!</h2>
            <p className="text-gray-600">Let’s focus on your digital detox journey.</p>
        </header>
    );
};

export default Header;