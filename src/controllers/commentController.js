import { createCommentService } from "../services/commentService";


export  async function createComment(req,res){
    try{
        const{content,onModel,commentableId}=req.body;
        const response =await createCommentService(content,req.user._id,onModel,commentableId);
        return res.status(201).json({
            success:true,
            message:"Comment created successfully",
            data:response
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        });
    }
}

export async function getCommentById(req,res){
    try{
       const commentId=req.param.id;
       const response=await findCommentByIdService(commentId);
       if(!response){
        return res.status(404).json({
            success:false,
            message:"Comment not found"
        });
    }
        return res.status(200).json({
            success:true,
            message:"Comment found successfully",
            data:response
        });
       }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
       }
    }
