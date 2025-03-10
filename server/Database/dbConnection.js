import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();
const MONGO_URI=process.env.MONGO_URL;



const dbConnect = async ()=>{
    try {
        await mongoose.connect(MONGO_URI)
        console.log("blogging second database was connected ")
        
    } catch (error) {
       console.log("error : ",error.message)        
    }
}
 
export default dbConnect;