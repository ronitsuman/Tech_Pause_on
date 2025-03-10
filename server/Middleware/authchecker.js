import CustomError from "../utils/Error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
 
dotenv.config();
const JwtKey = process.env.JWT_KEY;
console.log(JwtKey)
 
// const authChecker = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;  // Safely access cookies
//         console.log(token)

//         if (!token) {
//             console.error("No token provided");
//             throw new CustomError(401, "No token provided");
//         }

//         const decoded = jwt.verify(token, JwtKey);

//         if (!decoded) {
//             console.error("Token verification failed");
//             throw new CustomError(401, "Invalid token");
//         }

//         console.log("User :", decoded);
//         req.user = decoded;
        
//         return next();  // Ensure proper middleware flow
//     } catch (error) {
//         console.error("Authorization error:", error);
//         return res.status(401).json({ message: error.message || "You are not authorized" });
//     }
// };
// const authChecker = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt;  
//         console.log("Token from cookies:", token); 

//         if (!token) {
//             console.error("No token provided");
//             throw new CustomError(401, "No token provided");
//         }

//         const decoded = jwt.verify(token, JwtKey);
//         req.user = decoded;

//         return next();  
//     } catch (error) {
//         console.error("Authorization error:", error);
//         return res.status(401).json({ message: error.message || "You are not authorized" });
//     }
// };
const authChecker = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split("Bearer ")[1]
        console.log(token)
        if (!token) {
          console.error("No token provided");
          throw new CustomError(401, "No token provided");
         }
            
          const decoded = jwt.verify(token, JwtKey);
          
            
          if(!decoded){
            throw new CustomError(401,"invalid token")
          }
          console.log("user",decoded)
          req.person = decoded ;
          
       
          next()
    } catch (error) {
        console.log(error.message)
    }
}

export default authChecker;