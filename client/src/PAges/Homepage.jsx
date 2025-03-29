import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";


const Homepage = () => {
  const [posts, setPosts] = useState([]); 
  const [filteredPosts, setFilteredPosts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("all");

  //  Updated categories list
  const categories = [
    "all", 
    "Mindfulness Practice", 
    "Better Sleep Habits",
    "Work-Life Balance", 
    "Social Media Detox", 
    "uncategorized"
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs/getAllBlogs");
        console.log("API Response:", response.data);

        // Ensure all posts have a category
        const sanitizedPosts = response.data.map((post) => ({
          ...post,
          category: post.category || "uncategorized", 
          authorName: post.author?.name || "Unknown Author",
        }));

        setPosts(sanitizedPosts);
        setFilteredPosts(sanitizedPosts); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.category === selectedCategory));
    }
  }, [selectedCategory, posts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter Controls */}
      <div className="sticky top-0 bg-white py-6 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.replace("-", " ")}
            </button>
          ))}
          <button onClick={() => navigate(`/dashboard`)} className="bg-gray-200 hover:bg-red-400 hover:text-white rounded-md p-2 flex gap-2 items-center text-red-500"><FaHome /> dashboard
          </button>
        </div>
      </div>

      {/* Blog List (Flexbox Layout) */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence initial={false}>
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {filteredPosts.length === 0 ? (
              <p className="text-center w-full text-gray-500">No posts found.</p>
            ) : (
              filteredPosts.map((post) => (
                <motion.article
                  key={post._id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer w-full md:w-[48%] lg:w-[30%]"
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                  {/* <img
                    src={post.image || "/default-blog.jpg"}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  /> */}
                  <div className="p-6 flex flex-col gap-2">
                    <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full w-fit">
                      {post.category}
                    </span>
                    <img src={post.image} className="rounded" alt="" />
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="text-gray-600 text-sm">By {post.authorName}</p>
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Homepage;
