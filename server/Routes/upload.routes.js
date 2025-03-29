import express from "express";
import upload from '../Middleware/upload.js'
import { Person } from "../Models/User.model.js";

const router = express.Router();
  //sir g
// router.post('/profile/:id',upload.single("image"),async(req,res,file)=>{
//  console.log(req.file);
//  const {id}= req.params;
//  console.log("id",id)
//  const user = Person.findById(id);
//  Person.profilePic = req.file.path;
//  person.save();
//  res.json({message:"file uploaded succesfully ",profilePic:req.file.path})
// });;

//
router.post("/profile/:id", upload.single("image"), async (req, res) => {
    try {
        console.log(req.file); // Debugging ke liye file data check karein
        console.log("Request received for user:", req.params.id);
        console.log("Files:", req.file); 

        const { id } = req.params;
        console.log("id", id); // Check karein ki ID mil rahi hai ya nahi

        if (!id) return res.status(400).json({ message: "User ID is required" });

        const user = await Person.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        user.profilePic = req.file.path; // Correct way to update the user instance
        await user.save(); // Ensure async save

        res.json({success:true, message: "File uploaded successfully", profilePic: req.file.path });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.post("/profile/:id", upload.single("image"), async (req, res) => {
//     try {
//         console.log("Request received for user:", req.params.id);
//         console.log("File Uploaded:", req.file);

//         const { id } = req.params;
//         const { officialEmail, profession } = req.body; // 📩 Text fields capture karein

//         if (!id) return res.status(400).json({ success: false, message: "User ID is required" });

//         const user = await Person.findById(id);
//         if (!user) return res.status(404).json({ success: false, message: "User not found" });

//         // ✅ Image path update karein (frontend ke liye accessible)
//         if (req.file) {
//             person.profilePic = `/uploads/${req.file.filename}`;
//         }

//         // ✅ Official Email aur Profession bhi update karein
//         if (officialEmail) person.officialEmail = officialEmail;
//         if (profession) person.profession = profession;

//         await user.save(); // Async save 

//         res.json({
//             success: true,
//             message: "Profile updated successfully",
//             profilePic: person.profilePic,
//             officialEmail: person.officialEmail,
//             profession: person.profession
//         });

//     } catch (error) {
//         console.error("Profile Update Error:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// });
export default router;