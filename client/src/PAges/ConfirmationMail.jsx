import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const ConfirmationMail = () => {
  const handleResend = () => {
    // Logic to resend confirmation email
    toast.success("Confirmation email resent!");
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
          Check Your Email
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <p className="text-gray-600">
            A confirmation email has been sent to your email address. Please check your inbox and follow the instructions to confirm your account.
          </p>
          <button
            onClick={handleResend}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-medium hover:bg-teal-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Resend Confirmation Email
          </button>
        </motion.div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already confirmed?{" "}
          <a href="/login" className="text-teal-600 hover:text-teal-700 font-medium">
            Log in
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ConfirmationMail;