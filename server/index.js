import express from "express";
import cors from "cors";
import dbConnect from "./Database/dbConnection.js";
import {Route} from "./Routes/User.route.js";
import cookieParser from "cookie-parser"


const app = express();
const PORT = process.env.PORT||5000;

//db connection

(async () => {
    try {
        await dbConnect();
        app.listen(PORT ,()=>{
            console.log(`Server is running on port ${PORT}`);
            console.log("db is connected ")
        })
        
    } catch (error) {
        console.log("error :" , error.message)
        
    }
})();

// middleware
app.use(cors({
origin:"http://localhost:5173",
credential:true,
methods:["GET","POST","DELETE","PATCH"],
exposedHeaders:["Authorization"],
}
)

);
app.use(express.json());
app.use(cookieParser());

app.use("/api",Route)

app.use((err,req,res,next)=>{
    const {statusCode,message}=err;
    if(statusCode || message ){
     res.status(statusCode || 500).json({message});
    }else{
     res.status(500).json({message:"server error"})
    }
    console.log("status",statusCode,"error",message)
 })