import { Person } from "../Models/User.model.js";
import CustomError from "../utils/Error.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../services/nodemailer.js";
import { confirmationEmailTemplate, otpEmail } from "../Mail/template.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JwtKey = process.env.JWT_KEY;

// ** SIGNUP CONTROLLER **
export const SignupController = async (req, res) => {
  try {
    const { name, email, password, phone, category } = req.body;

    if (!name || !email || !password || !phone || !category) {
      throw new CustomError(401, "Please fill all required fields");
    }

    // ✅ Check if user already exists
    const existingUser = await Person.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      throw new CustomError(400, "Email or phone number already exists");
    }

    // ✅ Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailToken = crypto.randomBytes(10).toString("hex");

    const person = new Person({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: false,
      emailToken,
      category,
    });

    await person.save();

    // ✅ Send Verification Email
    try {
      sendEmail(
        email,
        "Verification Email from TechPause",
        confirmationEmailTemplate
          .replace("{name}", name)
          .replace("{link}", `http://localhost:3000/api/verify-email/${person._id}/${emailToken}`)
      );
    } catch (emailError) {
      console.error("Email Sending Error:", emailError);
      return res.status(500).json({ message: "Error sending verification email. Try again later!" });
    }

    res.status(200).json({ message: "User registered successfully. Check your email for verification." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ** VERIFY EMAIL CONTROLLER **
export const VerifyEmailController = async (req, res) => {
  try {
    const { id, token } = req.params;
    const person = await Person.findById(id);

    if (!person || person.emailToken !== token) {
      throw new CustomError(400, "Invalid or expired verification link");
    }

    person.isVerified = true;
    person.emailToken = null;
    await person.save();

    res.redirect("http://localhost:5173/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ** LOGIN CONTROLLER **
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(400, "Email & password are required");
    }

    const person = await Person.findOne({ email });

    if (!person) {
      throw new CustomError(400, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, person.password);
    if (!isPasswordValid) {
      throw new CustomError(401, "Incorrect Password");
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: person._id, name: person.name }, JwtKey, { expiresIn: "7d" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login Successful",
      token,
      person: { id: person._id, name: person.name ,profilePic :person.profilePic},
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ** FORGOT PASSWORD - VERIFY EMAIL & SEND OTP **
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const person = await Person.findOne({ email });

    if (!person) {
      throw new CustomError(400, "Email not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    person.otp = otp;
    await person.save();

    sendEmail(email, "TechPause Password Reset OTP", otpEmail.replace("{name}", person.name).replace("{otp}", otp));

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 
// ** OTP VERIFY **
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const person = await Person.findOne({ email });

    if (!person || person.otp !== otp) {
      throw new CustomError(400, "Invalid OTP");
    }

    res.status(200).json({ message: "OTP Verified Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ** RESET PASSWORD **
export const ResetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const person = await Person.findOne({ email });

    if (!person) {
      throw new CustomError(400, "User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    person.password = hashedPassword;
    person.otp = null;
    await person.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // ** UPDATE PROFILE **
// export const updateProfile = async (req, res) => {
//   try {
//     // if (!req.user || !req.user.id) {
//     //   return res.status(401).json({ message: "Unauthorized: User not logged in" });
//     // }

//     const userId = req.user.id;
//     const { address, officialEmail, profession } = req.body;

//     let updateData = { address, officialEmail, profession };

//     if (req.file) {
//       updateData.profilePic = req.file.path;
//     }

//     if (req.files && req.files.length > 0) {
//       updateData.documents = req.files.map((file) => file.path);
//     }

//     const updatedUser = await Person.findByIdAndUpdate(userId, updateData, { new: true });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "Profile updated successfully", updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateProfile = async (req, res) => {
//   try {
//     const { name, phone, category, address, officialEmail, profession, profilePic, documents } = req.body;
//     const userId = req.user.id; // JWT se authenticated user ka ID le rahe hain

//     // ✅ Check if user exists
//     const person = await Person.findById(userId);
//     if (!person) {
//       throw new CustomError(404, "User not found");
//     }

//     // ✅ Update allowed fields
//     if (name) person.name = name;
//     if (phone) person.phone = phone;
//     if (category) person.category = category;
//     if (address) person.address = address;
//     if (officialEmail) person.officialEmail = officialEmail;
//     if (profession) person.profession = profession;
//     if (profilePic) person.profilePic = profilePic; // Cloudinary URL
//     if (documents) person.documents = documents; // Array of document URLs

//     await person.save();

//     res.status(200).json({ message: "Profile updated successfully", person });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


