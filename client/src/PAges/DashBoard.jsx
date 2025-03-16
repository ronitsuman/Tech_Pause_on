import React,{useState} from 'react';
import { useSelector } from "react-redux"; //  Redux Hooks 
// import { logout } from "../redux/authSlice"; 
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import Sidebar from '../components/Sidebar';
import CreatePost from "../PAges/CreatePost"


const Dashboard = () => {

    const [currentContent, setCurrentContent] = useState('posts'); // Default to showing posts
    //  Redux se `person` ka data fetch 
    const { person } = useSelector((state) => state.auth); 
    // const dispatch = useDispatch();  logut 
    // const authState = useSelector((state) => state.auth);
    // console.log("Redux State in Dashboard:", authState); 
    // console.log("Person in Dashboard:", authState.person); 

    //  Agar `person` available hai to `name` lo, nahi to "Guest" dikhao
    const userName = person ? person.name : "Guest";
    const id =person ?  person.id:"123";

    // Sample blog posts
    const blogPosts = [
        { src:"/blog-mind.jpg" ,title:"Embracing Mindfulness", content: "Learn how to incorporate mindfulness into your daily routine.",time:"1 hour ago", author:"ronit" },
        { src:"/screen.jpg" ,title: "Digital Detox Tips", content: "Discover effective strategies to reduce screen time.",time:"1 hour ago", author:"ronit" },
        {src:"/blog-3.jpg" ,title: "Transform Your Life", content: "Inspiring stories from our community." ,time:"1 hour ago", author:"ronit"},
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar />
            <div className="flex w-auto md:mt-3">
                <Sidebar name={userName} id={id} onContentChange={setCurrentContent} />
                <div className="ml-16 mt-24 flex md:w-[100%] lg:w-[90%] flex-col p-2 md:mt-18 lg:ml-40">
                    {/*  Redux se userName fetch ho raha hai */}
                    <Header userName={userName} />
                    
                  
                    {/* Conditionally render content based on currentContent state */}
                    {currentContent === 'createPost' && <CreatePost />}
                    {currentContent === 'posts' && (
                        <div className="mt-4 md:ml-24 md:mt-4 flex flex-col gap-2 lg:w-[100%] lg:justify-between md:flex-col lg:flex-auto overflow-hidden lg:flex-row lg:ml-1 z-2">
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
