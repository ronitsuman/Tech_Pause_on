import mongoose from "mongoose";

// define the schemas 
 const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
       
        category:{
            type:String,
            required:true,
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Person"
        },
        comments:[
            {
                person: { type: mongoose.Schema.Types.ObjectId, ref: "Person" }, 
                text: { type: String, required: true } ,
                // 
                createdAt: { type: Date, default: Date.now }
            }
        ]
        

    },
    {timestamps:true})

    // exporting the Schema and defining the Schema
  export  const Blog = mongoose.model("Blog",blogSchema);