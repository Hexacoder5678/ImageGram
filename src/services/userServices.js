import { createUser, findUserByEmail } from "../repositories/userRepository.js";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import user from "../schema/user.js";
import { generateJwtToken } from "../utils/jwt.js";


export const signupUserService=async (user)=>{
    try{
    const newUser=await createUser(user);
    return newUser;
    }catch(error){
        if(error.name==='MongoServerError' && error.code===11000){
            throw{
                status:400,
                message:"User with the same email or usernmae already exists"
            }
        }
        throw error;
    }
}

export const signinUserService=async (userDetails)=>{
    try{
        //1.check if there is a valid registered user with the email
        const user=await findUserByEmail(userDetails.email);
        if(!user){
            throw{
            status:404,
            message:"User not found"
        }
    }
    //2.compare the password
    const isPasswordValid=bcrypt.compareSync(userDetails.password,user.password);
        if(!isPasswordValid){
            throw{
                status:401,
                message:"Invalid password"
            }
        }
        const token=generateJwtToken({email:user.email,_id:user._id,username:user.username});
        return token;
    }catch(error){
            throw error;
        }
    }