import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"; //redux hook
import {loginSuccess} from "../redux/authslice"  //redux action import 


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    let errors = {};

    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
      toast.error(errors.email);
    }

    if (!formData.password) {
      errors.password = "Password is required";
      toast.error(errors.password);
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
         formData 
      );
     
      const token = response.headers.authorization?.split("Bearer ")[1]; 
      const person = response.data.person; 

    

    if (!person) {
      console.error("Error: `person` not found in response!");
      toast.error("Login failed: Person data missing.");
      return;
    }

     dispatch(loginSuccess({ token, person }));
      


      toast.success("Login successful!");
      // console.log("Response", response.data);
      // Redirect to dashboard or home page
      navigate('/dashboard')
    } catch (error) {
      toast.error("Failed to log in, please try again.");
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

        <h2 className="text-xl text-gray-700 mb-6">Welcome Back!</h2>

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
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
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
                placeholder="Enter your password"
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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Reset it here
            </a>
          </p>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? <span className="animate-spin">⏳</span> : "Log In"}
          </button>
        </motion.form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
