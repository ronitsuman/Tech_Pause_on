import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import SidebarForgot from "../Components/SidebarForgot";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Verify Email, 2: Verify OTP, 3: Change Password
  const [email, setEmail] = useState(""); // Store email here
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send email verification request
      await axios.post("http://localhost:3000/api/check-email-otp", { email });
      toast.success("Verification email sent!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error("Failed to send verification email.");
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Email being sent:", email); // Debugging line
    console.log("OTP being sent:", otp);
    try {
      // Verify OTP
       await axios.post("http://localhost:3000/api/verify-OTP", { email, otp });
       toast.success("Otp verified ");
       setStep(3);
      // if (response.data.valid) {
      //   toast.success("OTP verified!");
      //   setStep(3); // Move to password change step
      // } else {
      //   console.log("otp",otp,"email",email)
      //   toast.error("Invalid OTP. Please try again.");
      // }
    } catch (error) {
      toast.error("Failed to verify OTP.",error.message);
      console.error("Error verifying OTP:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => { 
    e.preventDefault();
    setLoading(true);
    try {
      // Change password
      await axios.post("http://localhost:3000/api/reset-password", { email , newPassword });
      toast.success("Password changed successfully!");
      // Redirect to login page or perform any other action
      navigate("/login");
    } catch (error) {
      toast.error("Failed to change password.");
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <SidebarForgot currentStep={step} />
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email} // Use the email state
              onChange={(e) => setEmail(e.target.value)} // Update email state
              required
              className="px-4 py-2 border rounded"
            />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? "Sending..." : "Verify & Send OTP"}
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-x-4">
            <input
              type="tel"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="px-4 py-2 border rounded"
            />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handlePasswordChange} className="space-x-4">
            <input
              type="password"
              placeholder="Enter new password"  
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded"
            />
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;