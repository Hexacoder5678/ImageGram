import user from '../schema/user';


export const findUserByEmail=async (email)=>{
    try{
        const user=await UserActivation.findOne({email});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

export default findAllUsers=aync ()=>{
    try{
        const users=await user.find();
        return users;
    }catch(error){
        console.log(error);
    }
}
