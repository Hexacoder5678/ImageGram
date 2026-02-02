import mongoose, { isObjectIdOrHexString } from "mongoose";


const postSchema=new mongoose.Schema({
    caption:{
        type:String,
        required:true,
        minLength:5
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }]
});

const post=mongoose.model("Post",postSchema); //post collection

export default post;