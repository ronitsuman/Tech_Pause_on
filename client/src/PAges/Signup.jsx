import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Leaf, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const navigate = useNavigate()
  const [showHelp, setShowHelp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "", 
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const nameRegex = /^[A-Za-z\s]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    let errors = {};

    if (!nameRegex.test(formData.name)) {
      errors.name = "Name should only contain letters";
      toast.error(errors.name);
    }

    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must have at least one uppercase letter, one number, and one special character";
      toast.error(errors.password);
    }

    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Enter a valid 10-digit phone number";
      toast.error(errors.phone);
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
      toast.error(errors.email);
    }

    if (!formData.category) {
      errors.category = "Category is required";
      toast.error(errors.category);
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/signup", formData);
      toast.success("Registration successful!");
      console.log("Response", response.data);
      navigate("/ConfirmationMail")
    } catch (error) {
      toast.error("Failed to register, please try again.");
      console.log("Error submitting form", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen bg-[url("/signup-bg.jpg")] bg-cover bg-center bg-no-repeat'>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md p-8 mx-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-semibold text-gray-800">TechPause</h1>
        </div>

        <h2 className="text-xl text-gray-700 mb-6">
          Begin your digital wellness journey
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="Enter your full name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="your@email.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              maxLength="10"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="Enter Your Phone Number"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
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
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            >
              <option value="" disabled>
                Select your focus area
              </option>
              <option value="work">Work-Life Balance</option>
              <option value="social">Social Media Detox</option>
              <option value="mindfulness">Mindfulness Practice</option>
              <option value="sleep">Better Sleep Habits</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            {showHelp && (
              <div className="absolute z-10 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
                <p className="mb-2">
                  <strong>Work-Life Balance:</strong> For managing screen time
                  during work hours
                </p>
                <p className="mb-2">
                  <strong>Social Media Detox:</strong> For reducing social media
                  dependency
                </p>
                <p className="mb-2">
                  <strong>Mindfulness Practice:</strong> For developing digital
                  mindfulness
                </p>
                <p>
                  <strong>Better Sleep Habits:</strong> For improving sleep
                  through reduced screen time
                </p>
              </div>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Create a secure password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-spin">⏳</span>
            ) : (
              "Start Your Journey"
            )}
          </button>
        </motion.form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
            Sign in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};


export default Signup;