import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateProfilePic } from "../redux/authslice"; // Import action

function Profile() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loading state

    // Redux se user data lo
    const person = useSelector((state) => state.auth.person);
    const userId = person?.id;
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Redux Person Data:", person);
        console.log("Extracted User ID:", userId);
    }, [person]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile)); // ✅ Preview set karein
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");
        if (!userId) return alert("User ID not found");

        const formData = new FormData();
        formData.append("image", file);

        setLoading(true); // ✅ Animation start 

        try {
            const res = await axios.post(`http://localhost:3000/upload/profile/${userId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Upload Response:", res.data); // Debugging 

            if (res.data.success === true) {  
                const newProfileURL = res.data.profilePic;
                dispatch(updateProfilePic(newProfileURL)); 
                alert("Profile picture updated successfully!");
            } else {
                alert("Failed to upload profile picture.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading profile picture.");
        } finally {
            setLoading(false); // Animation stop
        }
    };

    return (
        <div className="ml-22 mt-20 flex items-center justify-around flex-col gap-6">
            <h2 className="font-bold text-xl">Update Profile Pic</h2>
            <div className="flex gap-4 items-center justify-center ">
                <h2 className="font-bold">Name :</h2> <span className="text-gray-600 capitalize">{person.name}</span>
                
            </div>
            <div className="flex gap-4 items-center justify-center ">
                <h2 className="font-bold">id :</h2> <span>{person.id}</span>

            </div>
            <input type="file" onChange={handleFileChange} className="border p-2" />
            
            {preview && <img src={preview} alt="Preview" className="w-24 h-24 rounded-full" />}

            <button 
                className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
                onClick={handleUpload}
                disabled={loading} // Jab tak upload ho raha hai button disable rahega
            >
                {loading ? "Uploading..." : "Upload"}
            </button>

           
        </div>
    );
}

export default Profile;
