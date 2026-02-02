import { $Command } from "@aws-sdk/client-s3";
import { createComment, findCommentById } from "../repositories/commentRepository";
import { findPostById } from "../repositories/postRepository"

export const createCommentService=async (content,useImperativeHandle,onModel,commentableId)=>{
    try{
       let parent=await fetchCommentParent(onModel,commentableId);
       if(!parent){
        throw{
            message:`${onModel} not found`,
            status:404
        }
       }

       const newComment=await createComment(content,useImperativeHandle,onModel,commentableId);
       await addChildCommentToParent(onModel,newComment,parent);
       return newComment;
        }catch(error){
        console.log(error);
    }
}


export const findCommentById=async (id)=>{
    try{
        const comment=await findCommonById(id);
        return comment;
    }catch(error){
        console.log(error);
    }
}

const addChildCommentToParent=async(onModel,comment,parent)=>{
    try{
        if(onModel==="Post"){
            parent.comments.push(comment._id);
        }else if(onModel==="Comment"){
            parent.replies.push(comment._id);
        }
        await parent.save();
    }catch(error){
        console.log(error);
    }
}


const fetchCommentParent=async (onModel,commentableId)=>{
    try{
        let parent;
        if(onModel==="Post"){
            parent=await findPostById(commentableId);
        } else if(onModel==="Comment"){
            parent=await findCommentById(commentableId)
        }
        return parent;
    }catch(error){
        console.log(error);
    }
}