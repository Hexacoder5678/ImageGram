import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
       username:{
        type:String,
        required:true, 
        unique:true,
        minlength:5
       },
       email:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
        validate:{
            validator: function (emailValue){
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailValue);
            },
            message:"Invalid email format"
        },
       },
       password:{
        type:String,
        required:true,
        minLength:5
       }
},{timestamps:true});

const user=mongoose.model("User",userSchema);

export default user;