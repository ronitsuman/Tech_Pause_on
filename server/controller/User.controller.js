// import express from "express";
import {Person} from "../Models/User.model.js"
import CustomError from "../utils/Error.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {sendEmail} from "../services/nodemailer.js" 
import {confirmationEmailTemplate, otpEmail} from "../Mail/template.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import cookies from "cookie-parser"

dotenv.config()
const JwtKey = process.env.JWT_KEY;

// signup controller starts here 
const SignupController = async(req,res)=>{
     //we want the items from the body we have to get it from body
    const{name, email, password, phone, category, otp, isVerified} = req.body;
    //we are checking is that all fields are filled or not 
    if(!name || !email || !password || !phone || !category ){
        //this is when used when we create the custom errors
        throw new CustomError(401,"Please Fill All the Required Fields")
    }
    //creating a variable name for checking if the user already exists 
    const existingUser = await Person.findOne({email})
    //if the email already exist in db then return 
    if(existingUser){
        throw new CustomError(400,"Email Already Exists ")
    }
    //checking the phone number if it already exists
    const newPhone = await Person.findOne({phone})
    //if it already exist send them a error
    if(newPhone){
        throw new CustomError(400,"number already exist try with another Number")
    }
    //before saving the password we convert it hash 
    const hashedPassword = await bcrypt.hash(password,10)
    //create email token for the verification
    const emailToken = crypto.randomBytes(10).toString("hex");
    //save user in database 
    const person = new Person({
        name,
        email,
        phone,
        password:hashedPassword,
        isVerified,
        otp,
        emailToken,
        category,
    })
    //save it 
    await person.save();
    //now we are fetching the saved email id for sending a verification email
    const signedPerson = await Person.findOne({email})
    //if not occurs 
    if(!signedPerson){
        throw new CustomError(500,"please try again ")
    }
    //getting id and convert into string
    const id = signedPerson._id.toString();
    // we are saving email token
    const savedMailToken = signedPerson.emailToken;

      // ** Step 8: Sending verification email** 
          const subject = " Verification Email from TechPause ";
          
          try {
            sendEmail(email, subject,
              confirmationEmailTemplate.replace("{name}", name)
                .replace("{link}", `http://localhost:3000/api/verify-email/${id}/${savedMailToken}`)
            );
          } catch (emailError) {
            console.error("Email Sending Error:", emailError);
            return res.status(500).json({ success: false, message: "❌ Error sending verification email. Try again later!" });
          }
      
          // ** Success Response**
          res.status(200).json({
            success: true,
            message: "✅ User created successfully! Please check your email for verification.",
          });
}
//signup controller ends here 

//verify email controller starts here
const VerifyEmailController = async(req,res)=>{
    // checking id and tokens from params
    const {id,token}=req.params;
    //checking with id
    const person = await Person.findById(id);
    // check the id exist or not
    if(!person){
        throw new CustomError(400,"User not found ")
    }
    //then person id finds true 
    person.isVerified = true;
    person.emailToken = null;
    //save in db
    await person.save();
    //success response status 
    // res.status(200).json({message:"verified succesfully"})
    //now we can redirect the page to login if verified 
    res.redirect("http://localhost:5173/login")
} 
//verify email controller Ends here 

//login api starts here
const LoginController = async(req,res)=>{
  //taking email and pass word from the body 
  const {email,password}= req.body;
  //check for mail aur password is provided or not 
  if(!email || !password){
    throw new CustomError(400, "Email & password should be neeeded")
  }
  //check in db
  const person = await Person.findOne({email});
  //if not fount 
  if (!person){
    throw new CustomError(400,"Email does not exist try again  ")
  }
  //if user valid then compare the password 
  const result = await bcrypt.compare(password,person.password);
  //if password won't match 
  if (!result) {
    throw new CustomError(401 , "InCorrect Password ")
  }
  //then giving a jwt token when user sign in to store it and (we are not enquire db for confirmation)
   //and sign the user with our secret key 
   const token = jwt.sign({name:person.name,id:person._id},JwtKey)
   //send it as cookies
  //  res.cookie("jwt", token); 
  res.setHeader("authorization",`Bearer ${token}`)
   console.log(token)  
   //return successful response 
   res.status(200).json({
    message: "Login Successful!",
    token: token,
    person: {
    id: person._id,
    name: person.name,
       
    },
  });
  
  //  res.status(200).json({message:"Login SuccessFul !"})
} 
//login api ends  here 

//forgot password api 3 api = (verifyEmail&sendOtp,Otp verify,PasswordReset) starts here 

// verifyEmail & send OTP starts here
const verifyEmail = async (req, res) => {
  const { email } = req.body;
  
  // Function to generate a 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const person = await Person.findOne({ email });

  if (!person) {
    throw new CustomError(400, "Email does not exist. Please check it.");
  }

  const otp = generateOTP(); // Generate the OTP
  person.otp = otp; // Store the OTP in the user's record
  await person.save(); // Save the updated user record

  // const subject = "Email from TechPause for Password Change";

  // try {
  //   sendEmail(
  //     email,
  //     subject,
  //     otpEmail.replace("{name}", person.name).replace("{otp}", otp)
  //   );
  // } catch (emailError) {
  //   console.error("Email Sending Error:", emailError);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Error sending password change email. Try again later!",
  //   });
  // }

  res.status(200).json({ success: true, message: "Check your email for OTP" });
};
//verifyEmail&send Otp ends here

//otp verify starts here
const verifyOtp = async(req,res)=>{ 
  //taking email from frontend context and otp by the body
  const{email,otp} = req.body;
  console.log("Received email:", email);
  console.log("Received OTP:", otp); 
  //finding user with email
  const person = await Person.findOne({email});
  //if user not found 
  if (!person){
    throw new CustomError(400, "user not exist ")
  }
  //otp check the user entered
  if(person.otp !== otp){
    throw new CustomError(400, "Incorrect Otp")
    console.log("person otp ",person.otp)
    console.log(" otp ",otp)
  }
  //then send response if matched
  res.status(200).json({message:"OTP Verified successfully"})
} 
//otp verify ends here 

//Password reset starts here
const ResetPassword = async(req,res)=>{
  //taking email and newPassword
  const { email , newPassword } = req.body;
  //check email in db
  const person = await Person.findOne({email});
  //if email wont exist 
  if(!person){
    throw new CustomError(400, "Email not found")
  }
  //hashing the password again before saving it on db 
  const hashedPassword = await bcrypt.hash(newPassword,10)
  //after hashing update the password in db
  person.password = hashedPassword ;
  console.log(hashedPassword)
  //otp setting to null
  person.otp = null; 
  
  //save it
  await person.save();
  console.log(person.password)
  //send response 
  res.status(200).json({message:"Password changed SuccessFully "})

}
//Password reset Ends here

//forgot password api 3 api = (verifyEmail&sendOtp,Otp verify,PasswordReset) ends here 


// get user data through api
// const GetUser = async()=>{
//   const person = await person.findById(req.params.id).select("name _id")
//   if(!person){
//     throw new CustomError(404 , "user not found")
//   }
// } 
//   res.status(200).json(person) 

export {SignupController , VerifyEmailController,LoginController,verifyEmail ,verifyOtp ,ResetPassword,};