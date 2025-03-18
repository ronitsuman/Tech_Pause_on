import mongoose from "mongoose";

// define the schemas 
 const personSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        },
        email:{
            type:String,
            unique:true,
            required:[true,"email is required"]
        },
        password:{
            type:String,
            required:true,

        },
        category:{
            required:true,
            type:String

        },
        isVerified:{
            type:Boolean,
            default:(false)
        },
        otp:{
            type:String,
            default:null
        },
        emailToken:{
            type:String,
            default:null
        },
        createdBlogs:{
            type:[mongoose.Schema.Types.ObjectId],
            ref:"Blog"
        }

    },
    {timestamps:true})

    // exporting the Schema and defining the Schema
    export const Person = mongoose.model("Person",personSchema);