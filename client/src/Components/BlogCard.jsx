
import React from 'react';

const BlogCard = ({ title, content,src,time,author }) => {
    return (
        <div className="bg-white w-fit h-fit   shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
            <div className="flex flex-col items-start p-4 flex-wrap ">
                <img className='hover:scale-126 rounded-md  ' width="fit" height={300} src={src} alt="" loading='lazy'/>
                <h3 className="text-lg font-bold text-gray-800 ">{title}</h3>
                <p className="text-gray-600 ">{content}</p>
                <div className='flex justify-between gap-52'>
                    {/* //time */}
                    <span className='text-gray-400' >{time}</span>
                    {/* author */}
                    <p className='text-gray-400 text-center'>by {author}</p>
                </div>
            </div>
        </div>                                  
    );
};

export default BlogCard;