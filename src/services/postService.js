import { countAllPosts, createPost as createPostRepository} from "../repositories/postRepository.js";
import { findAllPosts,updatePostById,deletePostById } from '../repositories/postRepository.js';



export const createPostService=async (createPostObejct)=>{
    
    // 1.take the image of the post and upload o aws

    //2. get the url of the image from the response

    //3. create a post with the caption and the image url in the db using repository

    // 4. return the post obejct


    const caption=createPostObejct.caption?.trim();
    const image=createPostObejct.image;

    const post=await createPostRepository(caption,image);
    return post;
}


export const getAllPostsService = async(offset,limit)=>{
    const posts=await findAllPosts(offset,limit);

    //calculate the total number of posts ad total number of pages
    const totalDocuments=await countAllPosts(); 

    const totalPages=Math.ceil(totalDocuments/limit);

    return {
        posts,
        totalPages,
        totalDocuments
    }
}


export const deletePostService=async (id)=>{
    //call the repository function
    const response=await deletePostById(id);
    return response;
}


export const updatePostService=async (id,updateObject)=>{
    //call the repository function
    const response=await updatePostById(id,updateObject);
    return response;
}