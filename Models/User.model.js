import mongoose from "mongoose";

// Define the schema 
const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "email is required"]
        },
        password: {
            type: String,
            required: true,
        },
        category: {
            required: true,
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
            default: null
        },
        emailToken: {
            type: String,
            default: null
        },
        createdBlogs: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Blog"
        },
        // New Fields for Profile
        profilePic: {
            type: String,
            default: ""  // Store image URL
        },
        address: {
            type: String,
            default: ""
        },
        officialEmail: {
            type: String,
            default: ""
        },
        profession: {
            type: String,
            default: ""
        },
        documents: [{
            type: String  // Store document file URLs
        }]
    },
    { timestamps: true }
);

// Export the Schema
export const Person = mongoose.model("Person", personSchema);
