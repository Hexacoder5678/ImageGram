import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre('save',function modifyPassword(/*next*/){
    //incoming user object
    const user=this;//object with plain password

    if(!user.isModified('password')){
        return ;
    }

    const SALT=bcrypt.genSaltSync(9);

    //hash passsword
    const hashedPassword=bcrypt.hashSync(user.password,SALT);

    //replace plain password with hashed password
     user.password=hashedPassword;

     //next();
});


const user=mongoose.model("User",userSchema);//user collection

export default user;