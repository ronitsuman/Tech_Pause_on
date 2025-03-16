// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { BlogPost } from '../types'; // Define your blog post type

// const Homepage = () => {
//   // const [selectedCategory, setSelectedCategory] = useState<string>('all');
//   const categories = ['all', 'digital-detox', 'mindfulness', 'minimalism'];

//   // const filteredPosts = posts.filter(post =>
//   //   selectedCategory === 'all' ? true : post.category === selectedCategory
//   // );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Filter Controls */}
//       <div className="sticky top-0 bg-white py-6 shadow-sm z-10">
//         <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full capitalize transition-colors ${
//                 selectedCategory === category
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//               }`}
//             >
//               {category.replace('-', ' ')}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Blog Grid */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <AnimatePresence initial={false}>
//           <motion.div
//             key={selectedCategory}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {filteredPosts.map(post => (
//               <motion.article
//                 key={post.id}
//                 layout
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
//               >
//                 <img
//                   src={post.image}
//                   alt={post.title}
//                   className="w-full h-48 object-cover rounded-t-xl"
//                 />
//                 <div className="p-6">
//                   <div className="flex gap-2 mb-3">
//                     <span className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
//                       {post.category}
//                     </span>
//                   </div>
//                   <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//                   <p className="text-gray-600 text-sm">By {post.author}</p>
//                 </div>
//               </motion.article>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Homepage; 
import React from 'react'
import Navbar from '../Components/Navbar'

const Homepage = () => {
  return (
    <div>
    <Navbar/>
   Homepage</div>
  )
}

export default Homepage