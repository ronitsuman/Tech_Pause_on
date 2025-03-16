// src/AboutUs.js
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';

const AboutUs = () => {
  const teamMembers = [
    { id: 1, name: "Ronit suman", role: "Founder & CEO", img: "/profile-pic.png" },
    { id: 2, name: "Rocky", role: "Chief Mindfulness Officer", img: "/team2.jpg" },
    { id: 3, name: "Unknown", role: "Community Manager", img: "/team3.jpg" },
  ];

  const stats = [
    { id: 1, value: "10,000+", label: "Users" },
    { id: 2, value: "200+", label: "Blogs Posted" },
    { id: 3, value: "50+", label: "Workshops Conducted" },
  ];

  return (
    <div>
        <Navbar/>
      {/* Hero Section */}
      <header 
        className="relative bg-cover bg-center h-[300px] " 
        style={{ backgroundImage: "url('/lake.jpg')" }}
        role="img" 
        aria-label="A calming nature scene with mountains and a lake"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex items-center justify-center h-full">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-6xl font-bold text-center px-4"
          >
            Helping You Reclaim Your Time & Focus
          </motion.h1>
        </div>
      </header>

      {/* Content Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-gray-100"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Purpose</h2>
            <p className="text-lg">
              At TechPause, we believe in the power of mindful living. Our platform helps individuals disconnect from digital distractions and reconnect with what truly matters.
            </p>
          </div>
          {/* Repeat for Vision and Empowerment */}
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img 
                src={member.img} 
                alt={member.name} 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Statistics Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Key Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 TechPause. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;