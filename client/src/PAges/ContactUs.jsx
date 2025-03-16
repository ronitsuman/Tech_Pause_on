import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
        <Navbar/>
      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mt-10"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            We'd Love to Hear from You!
          </h1>
          <p className="text-lg text-gray-600">
            Reach out for inquiries, feedback, or just to say hello
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter You Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="ronit@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
                <EnvelopeIcon className="w-8 h-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-gray-600">support@techpause.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
                <PhoneIcon className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-2xl shadow-lg">
                <MapPinIcon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    Dehradun <br />
                    
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-6 justify-center mt-8">
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaTwitter className="w-8 h-8" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="text-pink-600 hover:text-pink-800"
              >
                <FaInstagram className="w-8 h-8" />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="#"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin className="w-8 h-8" />
              </motion.a>
            </div>

            {/* Map Embed */}
            <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Office Location"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110942.8816041445!2d78.0322!3d30.3165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c266c89b6d%3A0x361a609c378e4c3b!2sDehradun%2C%20Uttarakhand!5e0!3m2!1sen!2sin!4v1716546789011!5m2!1sen!2sin"
                width="100%"
                height="300"
                className="border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;