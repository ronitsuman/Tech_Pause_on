import express from "express";
import cors from "cors";
import dbConnect from "../../TechPause/server/database/dbConnect";


const app = express();
const PORT = 3000;

//db connection

(async=>{
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
app.use(cors());
app.use(express.json());

app.use("/api",Route)