import { useState } from "react";
import {motion} from "framer-motion";
import { HelpCircle, Leaf, Eye, EyeOff } from 'lucide-react';




const Signup = () => {
  const[showHelp,setShowHelp] = useState(false)
  const [showPassword,setShowPassword]= useState(false)
  const [category,setCategory]=useState("")
  return (
    <div className='relative flex items-center justify-center min-h-screen bg-[url("/signup-bg.jpg")] bg-cover bg-center  bg-no-repeat'>
       <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      {/* form */}
      <div className="relative w-full max-w-md p-8 mx-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-semibold text-gray-800">TechPause</h1>
        </div>
        
        <h2 className="text-xl text-gray-700 mb-6">Begin your digital wellness journey</h2>
        
      <motion.form
       initial={{opacity:0,y:120}}
       whileInView={{opacity:1,y:0}}
       transition={{duration:1.50}}
       viewport={{once:true}}
        className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="Enter Your Phone Number"
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="text-teal-600 hover:text-teal-700 flex items-center gap-1 text-sm"
              >
                  <HelpCircle className="w-4 h-4" />
                Need help?
              </button>
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              <option value="" disabled  >Select your focus area</option>
              <option value="work">Work-Life Balance</option>
              <option value="social">Social Media Detox</option>
              <option value="mindfulness">Mindfulness Practice</option>
              <option value="sleep">Better Sleep Habits</option>
            </select>
            
            {showHelp && (
              <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
                <p className="mb-2"><strong>Work-Life Balance:</strong> For managing screen time during work hours</p>
                <p className="mb-2"><strong>Social Media Detox:</strong> For reducing social media dependency</p>
                <p className="mb-2"><strong>Mindfulness Practice:</strong> For developing digital mindfulness</p>
                <p><strong>Better Sleep Habits:</strong> For improving sleep through reduced screen time</p>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Create a secure password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Start Your Journey
          </button>
        </motion.form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
            Sign in
          </a>
        </p>
      </div>



    </div>
  )
}

export default Signup